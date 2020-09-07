import { calculateMonthlyCompoundInterest, calculateYearlyCompoundWithCharge } from './calculateCompoundInterest'


const data = [
  {
    Time: 'Year 1', ISA: 4000, SIPP: 2400, LISA: 2400, Other: 100
  },
  {
    Time: 'Year 2', ISA: 4500, SIPP: 1398, LISA: 2210, Other: 100
  },
]

describe('Compound Interest', () => {
  it('works', () => {
    const investment = {
      initialAmount: 0,
      expectedReturn: 0.1,
      monthlyContribution: 10,  
      noOfYearsToMature: 2
  }

    expect(calculateYearlyCompoundWithCharge(investment)).toStrictEqual({})
  })

  it.only('annual charges', () => {
    const investment = {
      initialAmount: 0,
      expectedReturn: 0.08,
      monthlyContribution: 5000,  
      noOfYearsToMature: 40,
      annualCharge: 0.015
  }

    expect(calculateYearlyCompoundWithCharge(investment)).toStrictEqual({})
  })
})
