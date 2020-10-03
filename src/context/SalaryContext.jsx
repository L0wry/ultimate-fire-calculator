import React, { useState } from 'react';
import calculateAllTax from '../utils/calculateAllTax'
import { all, create } from 'mathjs'

const math = create(all, {
	number: 'BigNumber',
	precision: 32
});

const SalaryContext = React.createContext({}); 

export const SalaryContextProvider = ({ children }) => {
	const state = JSON.parse(localStorage.getItem('salary')) ? JSON.parse(localStorage.getItem('salary')) : {}
	const [userTax, setUserTax] = useState(state)

	const setUserFinances = ({
		salary,
		taxFreePersonalAllowance,
		personalPensionContribution = 0,
		employerPensionContribution = 0,
		studentLoanPlanType = 0,
		secondaryIncomeAfterTax = 0
	}, addMultipleInvestments) => {
		const tax = calculateAllTax({
			salary,
			taxFreePersonalAllowance,
			employerPensionContributionPercent: employerPensionContribution / 100,
			personalPensionContributionPercent: personalPensionContribution / 100,
			secondaryIncomeAfterTax,
			studentLoanPlanType
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
			}
		])
	}

	return (
		<SalaryContext.Provider value={{ setUserFinances, userTax }}>
			{children}
		</SalaryContext.Provider>
	)
}

export const useSalaryContext = () => {
	const context = React.useContext(SalaryContext);
	if (context === undefined) {
		throw new Error('useSalaryContext must be used within SalaryContextProvider');
	}
	return context;
}

