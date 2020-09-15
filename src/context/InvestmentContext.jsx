import React, { useState } from 'react';
import { calculateYearlyCompoundWithCharge } from 'src/utils/calculateCompoundInterest';
const { Provider, Consumer } = React.createContext();

const noOfYearsToMature = 20;

const InvestmentContextProvider = ({ children }) => {
  const state = JSON.parse(localStorage.getItem('investments')) ? JSON.parse(localStorage.getItem('investments')) : []

  const [investments, setInvestments] = useState(state);
  
  const saveInvestments = (investment) => {

    setInvestments(investment)
    localStorage.setItem('investments', JSON.stringify(investment))
  }

  const addMultipleInvestments = (investmentsToAdd) => {
    const multipleInvestments = investmentsToAdd.map(({ name = '', initialAmount = 0, expectedReturn = 0, monthlyContribution = 0, annualCharge = 0 }) => {
      const investment = {
        name,
        initialAmount: parseFloat(initialAmount),
        expectedReturn: parseFloat(expectedReturn / 100),
        monthlyContribution: parseFloat(monthlyContribution),
        noOfYearsToMature: noOfYearsToMature,
        annualCharge: parseFloat(annualCharge),
        editMode: false
      }

      return {
        ...investment,
        compoundData: calculateYearlyCompoundWithCharge(investment)
      }
    })

    saveInvestments([
      ...multipleInvestments,
      ...investments.filter(investment1 => multipleInvestments.findIndex(newInvestments => newInvestments.name === investment1.name) === -1)
    ])
  }

  const addInvestment = ({ name = '', initialAmount = 0, expectedReturn = 0, monthlyContribution = 0, annualCharge = 0 }) => {
    const investment = {
      name,
      initialAmount: parseFloat(initialAmount),
      expectedReturn: parseFloat(expectedReturn / 100),
      monthlyContribution: parseFloat(monthlyContribution),
      noOfYearsToMature: noOfYearsToMature,
      annualCharge: parseFloat(annualCharge),
      editMode: false
    }

    saveInvestments([
      ...investments.filter(investment => investment.name !== name),
      {
        ...investment,
        compoundData: calculateYearlyCompoundWithCharge(investment)
      }
    ])
  }

  const editInvestment = idx => {
    saveInvestments(
      investments.map((investment, index) => {
        if (idx === index) {
          investment.editMode = true;
        }

        return investment;
      })
    );
  }

  const onItemSave = ({ name = '', initialAmount = 0, expectedReturn = 0, monthlyContribution = 0, annualCharge = 0 }, idx) => {
    const investment = {
      name,
      initialAmount: parseFloat(initialAmount),
      expectedReturn: parseFloat(expectedReturn / 100),
      monthlyContribution: parseFloat(monthlyContribution),
      noOfYearsToMature: noOfYearsToMature,
      annualCharge: parseFloat(annualCharge),
      editMode: false
    }

    const investmentCopy = [...investments]


    investmentCopy[idx] = {
      ...investment,
      compoundData: calculateYearlyCompoundWithCharge(investment)
    }
   
    saveInvestments(investmentCopy)
  }

  const removeInvestment = idx => {
    saveInvestments(investments.filter((_, index) => idx !== index));
  }

  const getExpectedMonthlyIncomeInXYears = year => investments.length > 0
    ? investments.reduce((accum, investment) => accum + investment.compoundData[`Year ${year}`]['Month 12'].earnedInterest, 0)
    : 0

  const getTotalNetWorthInXYears = year => investments.length > 0
    ? investments.reduce((accum, investment) => accum + investment.compoundData[`Year ${year}`]['Month 12'].balance, 0)
    : 0

    const getAmountInvestedPerMonth = () => investments.length > 0
    ? investments.reduce((accum, investment) => accum + investment.monthlyContribution, 0)
    : 0

  console.log(investments)
  return (
    <Provider value={{ investments, onItemSave, addInvestment, getAmountInvestedPerMonth, getTotalNetWorthInXYears, addMultipleInvestments, removeInvestment, editInvestment, getExpectedMonthlyIncomeInXYears }}>
      {children}
    </Provider>
  )
}

export { InvestmentContextProvider, Consumer as InvestmentContextConsumer }