import { convertInvestmentDataToFire } from './convertInvestmentDataToFire'
import { calculateYearlyCompoundWithCharge } from './calculateCompoundInterest'

describe('convertInvestmentDataToFire', () => {

  const investment = {
    initialAmount: 100,
    expectedReturn: .10,
    monthlyContribution: 0,
    noOfYearsToMature: 10,
    annualCharge: 0.00,
  }

  it('matches the snapshot', () => {

    const investments = [
      { compoundData: calculateYearlyCompoundWithCharge({ ...investment, name: 'investment 1' }) },
      { compoundData: calculateYearlyCompoundWithCharge({ ...investment, name: 'investment 2' }) }
    ]

    const safeWithdrawalPercent = .02
    const expenseTotal = 3000

    expect(convertInvestmentDataToFire(investments, safeWithdrawalPercent, expenseTotal)).toEqual([{"Expenses": 3000, "Income From Draw Down": 0.36, "year": "Year 1"}, {"Expenses": 3000, "Income From Draw Down": 0.4, "year": "Year 2"}, {"Expenses": 3000, "Income From Draw Down": 0.44, "year": "Year 3"}, {"Expenses": 3000, "Income From Draw Down": 0.5, "year": "Year 4"}, {"Expenses": 3000, "Income From Draw Down": 0.54, "year": "Year 5"}, {"Expenses": 3000, "Income From Draw Down": 0.6, "year": "Year 6"}, {"Expenses": 3000, "Income From Draw Down": 0.66, "year": "Year 7"}, {"Expenses": 3000, "Income From Draw Down": 0.74, "year": "Year 8"}, {"Expenses": 3000, "Income From Draw Down": 0.82, "year": "Year 9"}, {"Expenses": 3000, "Income From Draw Down": 0.9, "year": "Year 10"}]
    )
  })
})
