import React, { useState } from 'react';
import calculateTax from '../utils/calculateTax';
import { incomeTax } from '../utils/taxTypes';
const { Provider, Consumer } = React.createContext();

const SalaryContextProvider = ({ children }) =>{
    const [userFinance, setUserFinance] = useState({
		salary: 0,
		taxFreePersonalAllowance: 12500,
		employerPensionContribution: 0,
		personalPensionContribution: 0
	});
	
	
	// calculate taxable income first

	// calculate tax

	// calculate national insureance
	const setUserFinances = (userFinance) => {
		setUserFinance(userFinance);
	}

	const userTax = calculateTax(incomeTax(), userFinance)

  console.log(userFinance)
	return (
		<Provider value={{userFinance, setUserFinances, userTax}}>
			{children}
		</Provider>
	)
}

export { SalaryContextProvider, Consumer as SalaryContextConsumer }