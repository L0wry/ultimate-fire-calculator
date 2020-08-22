import {all, create} from 'mathjs'

const math = create(all, {
  number: 'BigNumber',  
  precision: 32
});

export function calculatePreTaxDeductions ({ taxFreePersonalAllowance, salary = 0, personalPensionContribution = 0}, taxBreaks = []) {
  const personalPensionContribution = math.multiply(personalPensionContribution, salary)
  const employerPensionContribution = math.multiply(employerPensionContribution, salary)
  
  const taxBreaksTotal = taxBreaks.reduce((accum, item) => math.add(accum, item.amount), 0)
  const taxableIncome = math.chain(salary)
    .subtract(taxFreePersonalAllowance)
    .subtract(personalPensionContribution)
    .subtract(taxBreaksTotal)
    .done()

    return {
      personalPensionContribution,
      employerPensionContribution,
      taxBreaksTotal,
      taxableIncome
    }

}
