import React, { useState } from 'react';
import calculateAllTax from '../utils/calculateAllTax'
const { Provider, Consumer } = React.createContext();

const SalaryContextProvider = ({ children }) => {
	const [userFinance, setUserFinance] = useState({
		salary: 0,
		taxFreePersonalAllowance: 12500,
		employerPensionContribution: 0,
		personalPensionContribution: 0
	});

	const setUserFinances = ({ salary, taxFreePersonalAllowance, personalPensionContribution, employerPensionContribution }) => {
		setUserFinance({
			salary,
			taxFreePersonalAllowance,
			employerPensionContributionPercent: employerPensionContribution / 100,
			personalPensionContributionPercent: personalPensionContribution / 100
		});
	}

	const userTax = calculateAllTax(userFinance)
	console.log(userTax)
	return (
		<Provider value={{ userFinance, setUserFinances, userTax }}>
			{children}
		</Provider>
	)
}

export { SalaryContextProvider, Consumer as SalaryContextConsumer }