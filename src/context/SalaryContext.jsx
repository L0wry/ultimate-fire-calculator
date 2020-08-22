import React, { useState } from 'react';
import calculateTax from '../utils/calculateIncomeTax';
import { incomeTax } from '../utils/taxTypes';
import calculateAllTax from '../utils/calculateAllTax'
const { Provider, Consumer } = React.createContext();

const SalaryContextProvider = ({ children }) => {
	const [userFinance, setUserFinance] = useState({
		salary: 0,
		taxFreePersonalAllowance: 12500,
		employerPensionContribution: 0,
		personalPensionContribution: 0
	});


	const setUserFinances = (userFinance) => {
		setUserFinance(userFinance);
	}


	// const userTax = {
	// 	...calculateTax(incomeTax(userFinance.taxFreePersonalAllowance), partialTax),
	// 	...partialTax
	// }

	const userTax = calculateAllTax(userFinance)
	console.log(userTax)

	return (
		<Provider value={{ userFinance, setUserFinances, userTax }}>
			{children}
		</Provider>
	)
}

export { SalaryContextProvider, Consumer as SalaryContextConsumer }