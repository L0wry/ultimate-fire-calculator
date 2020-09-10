import React, { useState } from 'react';
import { calculateYearlyCompoundWithCharge } from 'src/utils/calculateCompoundInterest';
const { Provider, Consumer } = React.createContext();

const noOfYearsToMature = 20;

const InvestmentContextProvider = ({ children }) => {
  const [investments, setInvestments] = useState([]);


  const addInvestment = ({ name, initialAmount, expectedReturn, monthlyContribution }) => {
    const investment = {
      name,
      initialAmount: parseFloat(initialAmount),
      expectedReturn: parseFloat(expectedReturn / 100),
      monthlyContribution: parseFloat(monthlyContribution),
      noOfYearsToMature: noOfYearsToMature
    }

    setInvestments(
      investments.concat({
        ...investment,
        compoundData: calculateYearlyCompoundWithCharge(investment)
      })
    );
  }

  const removeInvestment = idx => {
    setInvestments(investments.filter((_, index) => idx !== index));
  }


  return (
    <Provider value={{ investments, addInvestment, removeInvestment }}>
      {children}
    </Provider>
  )
}

export { InvestmentContextProvider, Consumer as InvestmentContextConsumer }