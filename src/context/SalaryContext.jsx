import React, { useState } from 'react';
import calculateAllTax from '../utils/calculateAllTax'
import { all, create } from 'mathjs'
const { Provider, Consumer } = React.createContext();

const math = create(all, {
	number: 'BigNumber',
	precision: 32
});

const SalaryContextProvider = ({ children }) => {
	const state = JSON.parse(localStorage.getItem('salary')).salary ? JSON.parse(localStorage.getItem('salary')) : {}
	const [userTax, setUserTax] = useState(state)

	const setUserFinances = ({ salary, taxFreePersonalAllowance, personalPensionContribution = 0, employerPensionContribution = 0 }, addMultipleInvestments) => {
		const tax = calculateAllTax({
			salary,
			taxFreePersonalAllowance,
			employerPensionContributionPercent: employerPensionContribution / 100,
			personalPensionContributionPercent: personalPensionContribution / 100
		})
		setUserTax(tax)
		localStorage.setItem('salary', JSON.stringify(tax))

		addMultipleInvestments([{
			name: 'Workplace Pension (employer contribution)',
			monthlyContribution: math.round(math.divide(tax.employerPensionContribution, 12), 2)
		},
		{
			name: 'Workplace Pension (personal contribution)',
			monthlyContribution: math.round(math.divide(tax.personalPensionContribution, 12), 2)
		}])
	}

	return (
		<Provider value={{ setUserFinances, userTax }}>
			{children}
		</Provider>
	)
}

export { SalaryContextProvider, Consumer as SalaryContextConsumer }