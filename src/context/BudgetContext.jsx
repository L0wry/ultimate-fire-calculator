import React, { useState } from 'react';
import { all, create } from 'mathjs'
const { Provider, Consumer } = React.createContext();

const math = create(all, {
    number: 'BigNumber',
    precision: 32
  });
  
  

const BudgetContextProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);


      const addExpense = ({name, cost}) => {
        console.log('p', name, cost)
        if (name !== "" || !cost) {
          setExpenses(
            expenses.concat({
              name,
              cost: parseFloat(cost),
              checked: true
            })
          );
        }
      }

      const checkExpense = idx => {
        setExpenses(
          expenses.map((expense, index) => {
            if (idx === index) {
              expense.checked = !expense.checked;
            }
  
            return expense;
          })
        );
      }

      const removeExpense = idx => {
        setExpenses(expenses.filter((_, index) => idx !== index));
      }
    
      const expenseTotal = expenses.length > 0
      ? expenses.filter(item => item.checked).reduce((acc, i) => math.add(acc, i.cost), 0)
      : 0

      console.log(expenses)

	return (
		<Provider value={{ expenses, addExpense, checkExpense, removeExpense, expenseTotal }}>
			{children}
		</Provider>
	)
}

export { BudgetContextProvider, Consumer as BudgetContextConsumer }