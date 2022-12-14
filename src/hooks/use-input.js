import { useCallback, useState } from 'react';

const useInput = validateInput => {
  const [enteredInput, setEnteredInput] = useState('');
  const [inputIsFocused, setInputIsFocused] = useState(false);

  const { inputIsValid, errorMessage } = validateInput(enteredInput);

  const inputHasError = !inputIsValid && inputIsFocused;

  const inputChangeHandler = useCallback(value => {
    setInputIsFocused(true);
    setEnteredInput(value);
  }, []);

  const inputBlurHandler = e => {
    setInputIsFocused(true);
  };

  const resetInput = () => {
    setInputIsFocused(false);
    setEnteredInput('');
  };

  return {
    enteredInput,
    inputIsValid,
    inputHasError,
    inputChangeHandler,
    inputBlurHandler,
    errorMessage,
    resetInput,
  };
};

export default useInput;
