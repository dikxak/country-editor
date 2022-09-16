import React, { useState, useRef, useEffect, useCallback } from 'react';

import classes from './Form.module.css';

const Form = props => {
  const { inputList } = props;
  const { updateItemData } = props;

  const errorObj = {};
  const inputObj = {};

  // Initialize value and error state for every input
  const initState = (initialObj, stateObj) => {
    inputList.forEach(val => {
      const key = Object.keys(val)[0];

      initialObj[key] = stateObj;
    });
  };
  initState(errorObj, {
    message: '',
    inputIsValid: false,
    inputIsTouched: false,
  });
  initState(inputObj, '');

  const inputRef = useRef();
  const [inputValues, setInputValues] = useState(inputObj);
  const [inputErrors, setInputErrors] = useState(errorObj);

  useEffect(() => {
    inputRef.current.focus();

    // Load update data
    if (updateItemData) {
      inputList.forEach(el => {
        const key = Object.keys(el)[0];

        setInputValues(prevValue => {
          return { ...prevValue, [key]: updateItemData[key] };
        });

        setInputErrors(prevValue => {
          return {
            ...prevValue,
            [key]: {
              message: '',
              inputIsValid: true,
              inputIsTouched: true,
            },
          };
        });
      });
    }
  }, [updateItemData, inputList]);

  const inputChangeHandler = (obj, key, e) => {
    const inputValue = e.target.value;

    const setInputState = msg => {
      setInputValues(prevValues => {
        return { ...prevValues, [key]: inputValue };
      });

      setInputErrors(prevErrors => {
        return {
          ...prevErrors,
          [key]: {
            message: `${obj.label} ${msg}`,
            inputIsValid: false,
            inputIsTouched: false,
          },
        };
      });
    };

    if (inputValue.trim().length === 0) {
      setInputState(`can not be empty.`);
    } else if (
      obj.type === 'text' &&
      inputValue.trim().length < obj.min &&
      !obj.max
    ) {
      setInputState(`must be more than or equal to ${obj.min} letters.`);
    } else if (
      obj.type === 'text' &&
      inputValue.trim().length < obj.min &&
      inputValue.trim().length > obj.max
    ) {
      setInputState(`must be between ${obj.min} and ${obj.max} letters.`);
    } else if (
      obj.type === 'number' &&
      +inputValue.trim() < obj.min &&
      !obj.max
    ) {
      setInputState(`value must be more than or equal to ${obj.min}.`);
    } else if (
      obj.type === 'number' &&
      +inputValue < obj.min &&
      +inputValue > obj.max
    ) {
      setInputState(`value must be between ${obj.min} and ${obj.max}.`);
    } else {
      setInputValues(prevValues => {
        return { ...prevValues, [key]: inputValue };
      });
      setInputErrors(prevError => {
        return {
          ...prevError,
          [key]: { message: '', inputIsValid: true, inputIsTouched: true },
        };
      });
    }
  };

  // Reset input value and error state
  const resetInputState = useCallback(
    (inputState, stateUpdateFn, initialState) => {
      Object.keys(inputState).forEach(key => {
        stateUpdateFn(prevData => {
          return { ...prevData, [key]: initialState };
        });
      });
    },
    []
  );

  const formSubmitHandler = e => {
    e.preventDefault();

    let flag = false;

    // Find all the keys where the error has occurred.
    const allInvalidInput = Object.keys(inputErrors).filter(
      key => !inputErrors[key].inputIsTouched
    );

    // Change the error state for all the input using the keys where the error has occurred.
    allInvalidInput.forEach(key => {
      inputList.forEach(val => {
        if (val[key]) {
          setInputErrors(prevData => {
            return {
              ...prevData,
              [key]: {
                message: `${val[key].label} can not be empty.`,
                inputIsTouched: false,
                inputIsValid: false,
              },
            };
          });
          flag = true;
        }
      });
    });

    // If any of the value is invalid, return the function.
    if (flag) return;

    // If update date is available, form submit should update the item else add the item.
    if (updateItemData) {
      props.onUpdateData(inputValues);
    } else {
      props.onAddData(inputValues);
    }

    resetInputState(inputValues, setInputValues, '');
    resetInputState(inputErrors, setInputErrors, {
      message: '',
      inputIsValid: false,
      inputIsTouched: false,
    });

    inputRef.current.focus();
  };

  return (
    <form onSubmit={formSubmitHandler} className={classes['form']}>
      <div className={classes['form-control-group']}>
        {inputList.map((input, i) => {
          const key = Object.keys(input)[0];
          const inputObj = input[key];

          return (
            <div key={key} className={classes['form-group']}>
              <label htmlFor={key}>{inputObj.label}</label>
              <input
                type={inputObj.type}
                id={key}
                name={key}
                ref={i === 0 ? inputRef : null}
                placeholder={inputObj.placeholder}
                min={inputObj.min || null}
                max={inputObj.max || null}
                value={inputValues[key]}
                // required={inputObj.required || true}
                onChange={inputChangeHandler.bind(null, inputObj, key)}
              />
              {inputErrors[key] && (
                <p className="error-msg">{inputErrors[key].message}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className={classes['form-action-group']}>
        <button type="submit">
          {updateItemData ? 'Update Country' : 'Add Country'}
        </button>
      </div>
    </form>
  );
};

export default Form;
