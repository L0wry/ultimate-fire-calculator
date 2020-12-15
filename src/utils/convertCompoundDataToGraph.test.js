import { convertCompoundDataToGraph } from './convertCompoundDataToGraph'
import { calculateYearlyCompoundWithCharge } from './calculateCumulativeInterest'

describe('Convert Compound Data To Graph', () => {
  it('works', () => {
    const investment = {
      initialAmount: 0,
      expectedReturn: 0.1,
      monthlyContribution: 10,
      noOfYearsToMature: 5
    }

    const compoundData = [
      {
        ...investment,
        name: 'investment 1',
        compoundData: calculateYearlyCompoundWithCharge({
          name: 'investment 1',
          ...investment
        })
      },
      {
        ...investment,
        name: 'investment 2',
        compoundData: calculateYearlyCompoundWithCharge({
          name: 'investment 2',
          ...investment
        })
      }

    ]
    expect(convertCompoundDataToGraph(compoundData)).toStrictEqual([{"investment 1": 125.67, "investment 2": 125.67, "year": "Year 1"}, {"investment 1": 264.49, "investment 2": 264.49, "year": "Year 2"}, {"investment 1": 417.84, "investment 2": 417.84, "year": "Year 3"}, {"investment 1": 587.25, "investment 2": 587.25, "year": "Year 4"}, {"investment 1": 774.39, "investment 2": 774.39, "year": "Year 5"}]
    )
  })
})
