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
      ...investments.filter(investment1 => multipleInvestments.includes(investment2 =>  investment2.name !== investment1.name)),
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

    console.log({investments})


      setInvestments([
        ...investments.filter(investment => investment.name !== name),
        {
          ...investment,
          compoundData: calculateYearlyCompoundWithCharge(investment)
        }
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