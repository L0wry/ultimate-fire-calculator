import React, { useState } from 'react';
import { all, create } from 'mathjs'
const { Provider, Consumer } = React.createContext();

const math = create(all, {
    number: 'BigNumber',
    precision: 32
  });
  
  

const BudgetContextProvider = ({ children }) => {
  const state = JSON.parse(localStorage.getItem('expenses')) ? JSON.parse(localStorage.getItem('expenses')) : []
    const [expenses, setExpenses] = useState(state);

      const addExpense = ({name, cost}) => {
        if (name !== "" || !cost) {
          const newExpenses = expenses.concat({
            name,
            cost: parseFloat(cost),
            checked: true
          })

          setExpenses(newExpenses);
          localStorage.setItem('expenses', JSON.stringify(newExpenses))
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
        const newExpenses = expenses.filter((_, index) => idx !== index)
        setExpenses(newExpenses);
        localStorage.setItem('expenses', JSON.stringify(newExpenses))
      }
    
      const expenseTotal = expenses.length > 0
      ? expenses.filter(item => item.checked).reduce((acc, i) => math.add(acc, i.cost), 0)
      : 0

	return (
		<Provider value={{ expenses, addExpense, checkExpense, removeExpense, expenseTotal }}>
			{children}
		</Provider>
	)
}

export { BudgetContextProvider, Consumer as BudgetContextConsumer }