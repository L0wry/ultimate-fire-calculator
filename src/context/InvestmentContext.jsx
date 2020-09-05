import React, { useState } from 'react';
const { Provider, Consumer } = React.createContext();


const InvestmentContextProvider = ({ children }) => {
    const [investments, setInvestments] = useState([]);


      const addInvestment = ({name, currentValue, expectedReturn, monthlyContribution}) => {
            setInvestments(
            investments.concat({
              name,
              currentValue: parseFloat(currentValue),
              expectedReturn: parseFloat(expectedReturn),
              monthlyContribution: parseFloat(monthlyContribution)
            })
          );
      }

      const removeInvestment = idx => {
        setInvestments(investments.filter((_, index) => idx !== index));
      }
    
    
      console.log(investments)

	return (
		<Provider value={{ investments, addInvestment, removeInvestment}}>
			{children}
		</Provider>
	)
}

export { InvestmentContextProvider, Consumer as InvestmentContextConsumer }