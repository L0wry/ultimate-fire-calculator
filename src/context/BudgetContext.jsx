import React, { useState } from 'react';
import { all, create } from 'mathjs'
import mortgageHelpers from 'mortgage-helpers'


const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

const BudgetContext = React.createContext({});

export const BudgetContextProvider = ({ children }) => {
  const budgetState = JSON.parse(localStorage.getItem('expenses')) ? JSON.parse(localStorage.getItem('expenses')) : []
  const [expenses, setExpenses] = useState(budgetState);

  const debtState = JSON.parse(localStorage.getItem('debts')) ? JSON.parse(localStorage.getItem('debts')) : []
  const [debts, setDebts] = useState(debtState)

  const saveDebts = debtsToSave => {
    setDebts(debtsToSave);
    localStorage.setItem('debts', JSON.stringify(debtsToSave))
  }

  const addDebt = ({
    name,
    outstandingAmountDue = 0,
    interestRate = 0,
    yearsLeftToPay = 0
  }) => {
    const newDebts = debts.concat({
      name,
      outstandingAmountDue,
      interestRate: math.divide(interestRate, 100),
      yearsLeftToPay,
      editMode: false,
      monthlyPayments: mortgageHelpers.getMonthlyPayments(outstandingAmountDue, interestRate, math.multiply(yearsLeftToPay, 12)),
    })

    saveDebts(newDebts);
  }

  const onDebtSave = ({
    name = "",
    outstandingAmountDue = 0,
    interestRate = 0,
    yearsLeftToPay = 0,
  }, idx) => {
    const debtCopy = [...debts]

    debtCopy[idx] = {
      name,
      outstandingAmountDue,
      interestRate: math.divide(interestRate, 100),
      yearsLeftToPay,
      editMode: false,
      monthlyPayments: mortgageHelpers.getMonthlyPayments(outstandingAmountDue, interestRate, math.multiply(yearsLeftToPay, 12)),
    }

    saveDebts(debtCopy)
  }

  const removeDebt = idx => {
    saveDebts(debts.filter((_, index) => idx !== index));
  }

  const editDebt = idx => {
    saveDebts(
      debts.map((debt, index) => {
        if (idx === index) {
          debt.editMode = true;
        }

        return debt;
      })
    );
  }

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

  const debtMonthlyTotal = debts.length > 0 ?
  debts.reduce((acc, i) => math.add(acc, i.monthlyPayments), 0) :
    0

  const allExpensesTotal = math.add(expenseTotal, debtMonthlyTotal) 

  return (
    <BudgetContext.Provider value={{
      debts,
      addDebt,
      editDebt,
      removeDebt,
      onDebtSave,
      expenses,
      addExpense,
      checkExpense,
      removeExpense,
      expenseTotal,
      allExpensesTotal

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
