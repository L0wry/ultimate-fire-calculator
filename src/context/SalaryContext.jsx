import React, { useState } from 'react';

const { Provider, Consumer } = React.createContext();

const calculateTax = ({salary, employerPensionContribution,  personalPensionContribution }) => {

	const taxFreePersonalAllowance = 11480
	const annualPersonalPensionContribution = personalPensionContribution * salary

	const taxableIncome = salary - taxFreePersonalAllowance - annualPersonalPensionContribution

	console.log('taxable income', taxableIncome)
	const lowerBand = {
		taxPercent: .2,
		start: taxFreePersonalAllowance + 0.1,
		end: 50000,
		taxPaid: 0,
		carryOver: 0
	}

	const difference = lowerBand.end  - lowerBand.start
	console.log('differnce: ', difference)
	
	if (taxableIncome > 0) {
		lowerBand.taxPaid = difference * lowerBand.taxPercent
		console.log('tax Paid : ', lowerBand.taxPaid)
		if(taxableIncome - difference > 0) {
			lowerBand.carryOver = taxableIncome - difference 
			console.log('carryOver : ', lowerBand.carryOver)
		}
	} else {
		//carry over * tax percent
	}

	// const taxAtLowerBand = 
	// if carryover is equal or greater than difference {
		// differnce * taxPercent
	// } else {
		// carry over * taxPercentage
	// }
	console.log(lowerBand)
	// const taxAmountAtLowerBand = 

}

const SalaryContextProvider = ({ children }) =>{
    const [userFinance, setUserFinance] = useState({
		salary: 0,
		employerPensionContribution: 0,
		personalPensionContribution: 0
	});
    
	const setUserFinances = (userFinance) => {
		setUserFinance(userFinance);
	}

	calculateTax(userFinance)

	return (
		<Provider value={{userFinance, setUserFinances}}>
			{children}
		</Provider>
	)
}

export { SalaryContextProvider, Consumer as SalaryContextConsumer }