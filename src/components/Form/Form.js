import React, { useState, useRef } from 'react';

import classes from './Form.module.css';

const Form = props => {
  const { inputList } = props;

  // Initial error state for every input in the list.
  const errorObj = {};
  inputList.forEach(val => {
    const key = Object.keys(val)[0];

    errorObj[key] = { message: '', inputIsValid: false, inputIsTouched: false };
  });

  // Initial value state for every input in the list.
  const inputObj = {};
  inputList.forEach(val => {
    const key = Object.keys(val)[0];

    inputObj[key] = '';
  });

  const inputRef = useRef();
  const [inputValues, setInputValues] = useState(inputObj);
  const [inputErrors, setInputErrors] = useState(errorObj);

  const inputChangeHandler = (obj, key, e) => {
    console.log(e.target.value);
    const inputValue = e.target.value;

    const setErrorMessage = msg => {
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
      setErrorMessage(`can not be empty.`);
    } else if (
      obj.type === 'text' &&
      inputValue.trim().length < obj.min &&
      !obj.max
    ) {
      setErrorMessage(`must be more than or equal to ${obj.min} letters.`);
    } else if (
      obj.type === 'text' &&
      inputValue.trim().length < obj.min &&
      inputValue.trim().length > obj.max
    ) {
      setErrorMessage(`must be between ${obj.min} and ${obj.max} letters.`);
    } else if (
      obj.type === 'number' &&
      +inputValue.trim() < obj.min &&
      !obj.max
    ) {
      setErrorMessage(`value must be more than or equal to ${obj.min}.`);
    } else if (
      obj.type === 'number' &&
      +inputValue < obj.min &&
      +inputValue > obj.max
    ) {
      setErrorMessage(`value must be between ${obj.min} and ${obj.max}.`);
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

  const formSubmitHandler = e => {
    e.preventDefault();

    let flag = false;

    const allInvalidInput = Object.keys(inputErrors).filter(
      key => !inputErrors[key].inputIsTouched
    );

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

    if (flag) return;

    props.onAddData(inputValues);

    Object.keys(inputValues).forEach(key => {
      setInputValues(prevData => {
        return { ...prevData, [key]: '' };
      });
    });

    Object.keys(inputErrors).forEach(key => {
      setInputErrors(prevData => {
        return {
          ...prevData,
          [key]: { message: '', inputIsValid: false, inputIsTouched: false },
        };
      });
    });

    inputRef.current.focus();
    // console.log(inputValues);
  };

  console.log(inputValues);

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
        <button type="submit">Add Country</button>
      </div>
    </form>
  );
};

export default Form;
