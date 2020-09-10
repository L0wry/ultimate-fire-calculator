import React, { useState } from 'react';
import { calculateYearlyCompoundWithCharge } from 'src/utils/calculateCompoundInterest';
const { Provider, Consumer } = React.createContext();

const noOfYearsToMature = 20;

const InvestmentContextProvider = ({ children }) => {
  const [investments, setInvestments] = useState([]);


  const addMultipleInvestments = (investmentsToAdd) => {
    const investments = investmentsToAdd.map(({ name = '', initialAmount = 0, expectedReturn = 0, monthlyContribution = 0 }) => {
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

    setInvestments(investments)
  }

  const addInvestment = ({ name = '', initialAmount = 0, expectedReturn = 0, monthlyContribution = 0 }) => {
    const investment = {
      name,
      initialAmount: parseFloat(initialAmount),
      expectedReturn: parseFloat(expectedReturn / 100),
      monthlyContribution: parseFloat(monthlyContribution),
      noOfYearsToMature: noOfYearsToMature
    }

    console.log({investments})
 
      setInvestments([
        {
          ...investment,
          compoundData: calculateYearlyCompoundWithCharge(investment)
        },
        ...investments,
      ])
  }


  const removeInvestment = idx => {
    setInvestments(investments.filter((_, index) => idx !== index));
  }

  console.log({ investments })

  return (
    <Provider value={{ investments, addInvestment, addMultipleInvestments, removeInvestment }}>
      {children}
    </Provider>
  )
}

export { InvestmentContextProvider, Consumer as InvestmentContextConsumer }