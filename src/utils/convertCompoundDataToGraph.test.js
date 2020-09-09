import { convertCompoundDataToGraph } from './convertCompoundDataToGraph'
import { calculateYearlyCompoundWithCharge } from './calculateCompoundInterest'

describe('Convert Compound Data To Graph', () => {
  it('works', () => {
    const investment = {
      initialAmount: 0,
      expectedReturn: 0.1,
      monthlyContribution: 10,
      noOfYearsToMature: 5
    }

    const compoundData = [
      calculateYearlyCompoundWithCharge({
        name: 'investment 1',
        ...investment
      }),
      calculateYearlyCompoundWithCharge({
        name: 'investment 2',
        ...investment
      })
    ]
    expect(convertCompoundDataToGraph(compoundData)).toStrictEqual([
      { "investment 1": 10, "investment 2": 10, "year": "Year 1" }, 
      { "investment 1": 136.72, "investment 2": 136.72, "year": "Year 2" }, 
      { "investment 1": 276.69, "investment 2": 276.69, "year": "Year 3" }, 
      { "investment 1": 431.32, "investment 2": 431.32, "year": "Year 4" }, 
      { "investment 1": 602.14, "investment 2": 602.14, "year": "Year 5" }]
    )
  })
})
