import React, { useState } from 'react';
import { calculateYearlyCompoundWithCharge } from 'src/utils/calculateCompoundInterest';
const { Provider, Consumer } = React.createContext();

const noOfYearsToMature = 20;

const InvestmentContextProvider = ({ children }) => {
  const [investments, setInvestments] = useState([]);


  const addMultipleInvestments = (investmentsToAdd) => {
    const multipleInvestments = investmentsToAdd.map(({ name = '', initialAmount = 0, expectedReturn = 0, monthlyContribution = 0 }) => {
      const investment = {
        name,
        initialAmount: parseFloat(initialAmount),
        expectedReturn: parseFloat(expectedReturn / 100),
        monthlyContribution: parseFloat(monthlyContribution),
        noOfYearsToMature: noOfYearsToMature
      }

      return {
        ...investment,
        compoundData: calculateYearlyCompoundWithCharge(investment)
      }
    })

    setInvestments([
      ...multipleInvestments,
      ...investments.filter(investment1 => multipleInvestments.findIndex(newInvestments => newInvestments.name === investment1.name) === -1)
    ])
  }

  const addInvestment = ({ name = '', initialAmount = 0, expectedReturn = 0, monthlyContribution = 0 }) => {
    const investment = {
      name,
      initialAmount: parseFloat(initialAmount),
      expectedReturn: parseFloat(expectedReturn / 100),
      monthlyContribution: parseFloat(monthlyContribution),
      noOfYearsToMature: noOfYearsToMature
    }

    setInvestments([
      ...investments.filter(investment => investment.name !== name),
      {
        ...investment,
        compoundData: calculateYearlyCompoundWithCharge(investment)
      }
    ])
  }

  const getExpectedMonthlyIncomeInXYears = year => investments.length > 0 
  ? investments.reduce((accum, investment) => accum + investment.compoundData[`Year ${year}`]['Month 12'].earnedInterest, 0)
  : 0

  const getTotalNetWorthInXYears = year => investments.length > 0 
  ? investments.reduce((accum, investment) => accum + investment.compoundData[`Year ${year}`]['Month 12'].balance, 0)
  : 0

  const removeInvestment = idx => {
    setInvestments(investments.filter((_, index) => idx !== index));
  }

  return (
    <Provider value={{ investments, addInvestment, getTotalNetWorthInXYears, addMultipleInvestments, removeInvestment, getExpectedMonthlyIncomeInXYears }}>
      {children}
    </Provider>
  )
}

export { InvestmentContextProvider, Consumer as InvestmentContextConsumer }