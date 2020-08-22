import { all, create } from 'mathjs'

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

export function calculatePreTaxDeductions({ salary = 0, personalPensionContribution = 0 }, taxBreaks = []) {

  const taxBreaksTotal = taxBreaks.reduce((accum, item) => math.add(accum, item.amount), 0)
  let taxableIncome = math
    .chain(salary)
    .subtract(personalPensionContribution)
    .subtract(taxBreaksTotal)
    .done()

  taxableIncome = taxableIncome > 0
    ? taxableIncome = taxableIncome
    : 0


  return {
    taxBreaksTotal,
    taxableIncome
  }

}
