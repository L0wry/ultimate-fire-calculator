import React, { useState } from 'react';
import { all, create } from 'mathjs'
import { Investment } from '../investments/Investment';

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

const InvestmentContext = React.createContext({});

export const InvestmentContextProvider = ({ children }) => {
  const yearState = localStorage.getItem('yearsToMature') || 10
  const investmentState = JSON.parse(localStorage.getItem('investments')) 
  ? JSON.parse(localStorage.getItem('investments')).map(investment => new Investment({
          investmentType: investment._investmentType,
          initialAmount: investment._initialAmount,
          expectedReturn: investment._expectedReturn,
          monthlyContribution: investment._monthlyContribution ,
          noOfYearsToMature: yearState,
          annualCharge: investment._annualCharge,
          compoundData: investment._compoundData
  })) 
  : []
  const safeWithdrawalPercentState = localStorage.getItem('safeWithdrawalPercent') || 0.04
  const [investments, setInvestments] = useState(investmentState);
  const [yearsToMature, setYearsToMature] = useState(yearState)
  const [safeWithdrawalPercent, setSafeWithdrawalPercent] = useState(safeWithdrawalPercentState)

  const saveSafeWithdrawalPercent = percent => {
    setSafeWithdrawalPercent(parseFloat(percent) /  100)
      localStorage.setItem('safeWithdrawalPercent', percent /  100)
  }

  const saveYearsToMature = years => {
    setYearsToMature(years)

    const newInvestments = [...investments].map(investment => {
      investment.noOfYearsToMature = years
      return investment 
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

      let isInvestmentAlreadyInList = copy.findIndex(oldInvestments => oldInvestments.investmentType === newInvestment.name)

      if (isInvestmentAlreadyInList > -1) {
        const { monthlyContribution } = newInvestment
        copy[isInvestmentAlreadyInList].monthlyContribution = monthlyContribution

      } else {
        copy.push(new Investment({
          investmentType: newInvestment.name,
          initialAmount: newInvestment.initialAmount,
          expectedReturn: newInvestment.expectedReturn,
          monthlyContribution: newInvestment.monthlyContribution ,
          noOfYearsToMature: yearsToMature,
          annualCharge: newInvestment.annualCharge
        }))
      }

    }

    saveInvestments(copy)
  }

  const addInvestment = ({ name = '', initialAmount = 0, expectedReturn = 0, monthlyContribution = 0, annualCharge = 0 }) => {

    const investment = new Investment({
      investmentType: name,
      initialAmount,
      expectedReturn,
      monthlyContribution,
      noOfYearsToMature: yearsToMature,
      annualCharge
    })

    saveInvestments([
      ...investments.filter(investment => investment.investmentType !== name),
      investment
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
 
    const investmentCopy = [...investments]

    investmentCopy[idx] = new Investment({
      investmentType: name,
      initialAmount,
      expectedReturn,
      monthlyContribution,
      noOfYearsToMature: yearsToMature,
      annualCharge
    })

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
    math.round(investments.reduce((accum, investment) => accum + investment.monthlyContribution, 0), 2) :
    0

  return (
    <InvestmentContext.Provider value={{ safeWithdrawalPercent, saveSafeWithdrawalPercent, investments, saveYearsToMature, yearsToMature, onItemSave, addInvestment, getAmountInvestedPerMonth, getTotalNetWorthInXYears, addMultipleInvestments, removeInvestment, editInvestment, getExpectedInterestIncomeInXYears }}>
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
