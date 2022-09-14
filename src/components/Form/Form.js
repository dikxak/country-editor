import React, { useRef } from 'react';

import useInput from '../../hooks/use-input';

import classes from './Form.module.css';

const Form = props => {
  const nameRef = useRef();

  const {
    enteredInput: nameInput,
    inputHasError: nameHasError,
    inputIsValid: nameIsValid,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    errorMessage: nameErrorMessage,
    resetInput: resetName,
  } = useInput(value => {
    return {
      inputIsValid: value.trim().length !== 0,
      errorMessage: 'Country name can not be empty.',
    };
  });

  const {
    enteredInput: capitalInput,
    inputHasError: capitalHasError,
    inputIsValid: capitalIsValid,
    inputChangeHandler: capitalChangeHandler,
    inputBlurHandler: capitalBlurHandler,
    errorMessage: capitalErrorMessage,
    resetInput: resetCapital,
  } = useInput(value => {
    return {
      inputIsValid: value.trim().length !== 0,
      errorMessage: 'Country capital can not be empty.',
    };
  });

  const {
    enteredInput: populationInput,
    inputHasError: populationHasError,
    inputIsValid: populationIsValid,
    inputChangeHandler: populationChangeHandler,
    inputBlurHandler: populationBlurHandler,
    errorMessage: populationErrorMessage,
    resetInput: resetPopulation,
  } = useInput(value => {
    const inputLengthIsValid = value.trim().length !== 0;
    const inputValueIsValid = +value > 0;

    const inputIsValid = inputLengthIsValid && inputValueIsValid;

    const errorMessage = !inputLengthIsValid
      ? 'Country population can not be empty.'
      : !inputValueIsValid
      ? 'Country population can not be less than 1.'
      : '';
    return {
      inputIsValid,
      errorMessage,
    };
  });

  const formIsValid = nameIsValid && capitalIsValid && populationIsValid;

  const formSubmitHandler = e => {
    e.preventDefault();

    nameBlurHandler(e);
    capitalBlurHandler(e);
    populationBlurHandler(e);

    if (!formIsValid) return;

    console.log(nameInput, capitalInput, populationInput);

    nameRef.current.focus();

    resetName();
    resetCapital();
    resetPopulation();
  };

  return (
    <form onSubmit={formSubmitHandler} className={classes['form']}>
      <div className={classes['form-control-group']}>
        <div className={classes['form-group']}>
          <label htmlFor="name">Enter name:</label>
          <input
            type="text"
            id="name"
            name="name"
            ref={nameRef}
            placeholder="e.g. Nepal"
            value={nameInput}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasError && <p className="error-msg">{nameErrorMessage}</p>}
        </div>

        <div className={classes['form-group']}>
          <label htmlFor="population">Enter population:</label>
          <input
            type="number"
            id="population"
            name="population"
            placeholder="e.g. 30286125"
            value={populationInput}
            onChange={populationChangeHandler}
            onBlur={populationBlurHandler}
          />
          {populationHasError && (
            <p className="error-msg">{populationErrorMessage}</p>
          )}
        </div>

        <div className={classes['form-group']}>
          <label htmlFor="capital">Enter capital:</label>
          <input
            type="text"
            id="capital"
            name="capital"
            placeholder="e.g. Kathmandu"
            value={capitalInput}
            onChange={capitalChangeHandler}
            onBlur={capitalBlurHandler}
          />
          {capitalHasError && (
            <p className="error-msg">{capitalErrorMessage}</p>
          )}
        </div>
      </div>

      <div className={classes['form-action-group']}>
        <button type="submit">Add Country</button>
      </div>
    </form>
  );
};

export default Form;
