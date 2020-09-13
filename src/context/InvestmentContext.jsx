import React, { useState } from 'react';
import { calculateYearlyCompoundWithCharge } from 'src/utils/calculateCompoundInterest';
const { Provider, Consumer } = React.createContext();

const noOfYearsToMature = 20;

const InvestmentContextProvider = ({ children }) => {
  const [investments, setInvestments] = useState([]);


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

    setInvestments([
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

    setInvestments([
      ...investments.filter(investment => investment.name !== name),
      {
        ...investment,
        compoundData: calculateYearlyCompoundWithCharge(investment)
      }
    ])
  }

  const editInvestment = idx => {
    setInvestments(
      investments.map((investment, index) => {
        if (idx === index) {
          investment.editMode = !investment.editMode;
        }

        return investment;
      })
    );
  }

  const onItemSave = (investment, idx) => {
    setInvestments(
      investments.splice(idx, 1, {
        ...investment,
        editMode: false
      })
    )
  }
  const removeInvestment = idx => {
    setInvestments(investments.filter((_, index) => idx !== index));
  }

  const getExpectedMonthlyIncomeInXYears = year => investments.length > 0
    ? investments.reduce((accum, investment) => accum + investment.compoundData[`Year ${year}`]['Month 12'].earnedInterest, 0)
    : 0

  const getTotalNetWorthInXYears = year => investments.length > 0
    ? investments.reduce((accum, investment) => accum + investment.compoundData[`Year ${year}`]['Month 12'].balance, 0)
    : 0

  return (
    <Provider value={{ investments, onItemSave, addInvestment, getTotalNetWorthInXYears, addMultipleInvestments, removeInvestment, editInvestment, getExpectedMonthlyIncomeInXYears }}>
      {children}
    </Provider>
  )
}

export { InvestmentContextProvider, Consumer as InvestmentContextConsumer }