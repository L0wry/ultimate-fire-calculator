import React, { useState } from 'react';
import { all, create } from 'mathjs'

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

const BudgetContext = React.createContext({});

export const BudgetContextProvider = ({ children }) => {
  const state = JSON.parse(localStorage.getItem('expenses')) ? JSON.parse(localStorage.getItem('expenses')) : []
  const differenceState = localStorage.getItem('expenseDifference') || 0

  const [expenses, setExpenses] = useState(state);

  const [difference, setDifference] = useState(differenceState)

  const addExpense = ({ name, cost }) => {
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

  const expenseTotal = expenses.length > 0 ?
    expenses.filter(item => item.checked).reduce((acc, i) => math.add(acc, i.cost), 0) :
    0

  const calculateDifference = (totalTakeHome = 0) => {
    const newDifference = math.round(math.subtract(totalTakeHome, expenseTotal), 2)
    setDifference(newDifference)
    localStorage.setItem('expenseDifference', newDifference)
  }

  return (
    <BudgetContext.Provider value={{
      expenses,
      addExpense,
      checkExpense,
      removeExpense,
      expenseTotal,
      difference,
      calculateDifference
    }}>
      {children}
    </BudgetContext.Provider>
  )
}

export const useBudgetContext = () => {
  const context = React.useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudgetContext must be used within BudgetContextProvider');
  }
  return context;
}
