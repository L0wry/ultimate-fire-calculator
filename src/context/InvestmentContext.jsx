import React, { useState } from 'react';
import { calculateYearlyCompoundWithCharge } from 'src/utils/calculateCompoundInterest';
import { all, create } from 'mathjs'

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

const InvestmentContext = React.createContext({});

export const InvestmentContextProvider = ({ children }) => {
  const investmentState = JSON.parse(localStorage.getItem('investments')) ? JSON.parse(localStorage.getItem('investments')) : []
  const yearState = localStorage.getItem('yearsToMature') || 1
  const drawdownState = localStorage.getItem('drawDownPercent') || 0.04
  
  const [investments, setInvestments] = useState(investmentState);
  const [yearsToMature, setYearsToMature] = useState(yearState)
  const [drawDownPercent, setDrawDownPercent] = useState(drawdownState)


  const saveDrawdown = percent => {
    console.log(percent)
      setDrawDownPercent(percent /  100)
      localStorage.setItem('drawDownPercent', percent /  100)
  }

  const saveYearsToMature = years => {
    setYearsToMature(years)

    const newInvestments = [...investments].map(investment => {
      const investmentToRecalculate = {
        ...investment,
        noOfYearsToMature: years,
      }

      return {
        ...investmentToRecalculate,
        compoundData: calculateYearlyCompoundWithCharge(investmentToRecalculate)
      }
    })

    setInvestments(newInvestments)

    localStorage.setItem('investments', JSON.stringify(newInvestments))
    localStorage.setItem('yearsToMature', years)
  }
  const saveInvestments = (investmentToSave) => {
    setInvestments(investmentToSave)
    localStorage.setItem('investments', JSON.stringify(investmentToSave))
  }

  const addMultipleInvestments = (investmentsToAdd) => {

    const copy = [...investments]

    for (const newInvestment of investmentsToAdd) {

      let isInvestmentAlreadyInList = copy.findIndex(oldInvestments => oldInvestments.name === newInvestment.name)

      if (isInvestmentAlreadyInList > -1) {
        const { monthlyContribution } = newInvestment
        const investment = {
          ...copy[isInvestmentAlreadyInList],
          monthlyContribution: parseFloat(monthlyContribution),
        }

        copy[isInvestmentAlreadyInList] = {
          ...investment,
          compoundData: calculateYearlyCompoundWithCharge(investment)
        }

      } else {
        const investment = {
          name: newInvestment.name,
          initialAmount: 0,
          expectedReturn: 0,
          annualCharge: 0,
          monthlyContribution: parseFloat(newInvestment.monthlyContribution),
          editMode: false,
          noOfYearsToMature: yearsToMature,
        }

        copy.push({
          ...investment,
          compoundData: calculateYearlyCompoundWithCharge(investment)
        })
      }

    }

    saveInvestments(copy)
  }

  const addInvestment = ({ name = '', initialAmount = 0, expectedReturn = 0, monthlyContribution = 0, annualCharge = 0 }) => {
    const investment = {
      name,
      initialAmount: parseFloat(initialAmount),
      expectedReturn: math.round(math.divide(expectedReturn, 100), 2),
      monthlyContribution: parseFloat(monthlyContribution),
      noOfYearsToMature: yearsToMature,
      annualCharge: math.divide(annualCharge, 100),
      editMode: false,
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
      expectedReturn: math.round(math.divide(expectedReturn, 100), 2),
      monthlyContribution: parseFloat(monthlyContribution),
      noOfYearsToMature: yearsToMature,
      annualCharge: math.divide(annualCharge, 100),
      editMode: false,
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

  const getExpectedInterestIncomeInXYears = () => investments.length > 0 ?
    math.round(investments.reduce((accum, investment) => accum + investment.compoundData[`Year ${yearsToMature}`]['Month 12'].earnedInterest, 0), 2) :
    0

  const getTotalNetWorthInXYears = () => investments.length > 0 ?
    math.round(investments.reduce((accum, investment) => accum + investment.compoundData[`Year ${yearsToMature}`]['Month 12'].balance, 0), 2) :
    0

  const getAmountInvestedPerMonth = () => investments.length > 0 ?
    investments.reduce((accum, investment) => accum + investment.monthlyContribution, 0) :
    0

  return (
    <InvestmentContext.Provider value={{ drawDownPercent, saveDrawdown, investments, saveYearsToMature, yearsToMature, onItemSave, addInvestment, getAmountInvestedPerMonth, getTotalNetWorthInXYears, addMultipleInvestments, removeInvestment, editInvestment, getExpectedInterestIncomeInXYears }}>
      {children}
    </InvestmentContext.Provider>
  )
}

export const useInvestmentContext = () => {
  const context = React.useContext(InvestmentContext);
  if (context === undefined) {
    throw new Error('useInvestmentContext must be used within InvestmentProvider');
  }
  return context;
}
