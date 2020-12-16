import investmentMetaData from './investmentMetaData'
import { all, create } from 'mathjs'

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

export function validateInvestments(investments) {
  const validatedInvestments = []

  for (const [investmentType, metaData] of Object.entries(investmentMetaData)) {

    const filteredInvestments = investments.filter(investment => investment?.investmentType === investmentType)

    const filteredInvestmentsTotal = math.multiply(filteredInvestments.reduce((a, b) => a + b.monthlyContribution, 0), 12)
    if (filteredInvestmentsTotal > metaData.annualAllowance) {
      validatedInvestments.push(...filteredInvestments.map(investment => {
        investment.isOverAnnualAllowance = true
        return investment
      }))
    } else {
      validatedInvestments.push(...filteredInvestments.map(investment => {
        investment.isOverAnnualAllowance = false
        return investment
      }))
    }
  }

  return validatedInvestments
}
