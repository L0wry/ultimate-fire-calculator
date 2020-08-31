import { useState } from "react";

export const useInputName = (initialValue = {name: "", cost: 0}) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const clearInput = () => setInputValue({name: "", cost: ""})

  return {
    inputValue,
    clearInput,
    changeInput: event => setInputValue({...inputValue, [event.target.name]:  event.target.value}),
    keyInput: (event, callback) => {
      if (event.which === 13 || event.keyCode === 13) {
        callback(inputValue, clearInput);
        return true;
      }

      return false;
    }
  };
};
