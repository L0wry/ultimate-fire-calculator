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



// export const useExpenses = (initialValue = []) => {
//   const [expenses, setExpenses] = useState(initialValue);

//   return {
//     expenses,
//     addExpense: ({name, cost}) => {
//       if (name !== "" || !cost) {
//         setExpenses(
//           expenses.concat({
//             name,
//             cost: parseFloat(cost),
//             checked: false
//           })
//         );
//       }
//     },
//     checkExpense: idx => {
//       setExpenses(
//         expenses.map((expense, index) => {
//           if (idx === index) {
//             expense.checked = !expense.checked;
//           }

//           return expense;
//         })
//       );
//     },
//     removeExpense: idx => {
//       setExpenses(expenses.filter((_, index) => idx !== index));
//     }
//   };
// };
