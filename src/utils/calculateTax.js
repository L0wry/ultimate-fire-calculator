import {all, create} from 'mathjs'

const BANDS = ['lowerBand', 'mediumBand', 'upperBand']

const math = create(all, {
  number: 'BigNumber',  
  precision: 32
});

const calculateTax = (tax, { salary = 0, personalPensionContribution = 0 }, taxBreaks = []) => {
  const annualPersonalPensionContribution = math.multiply(personalPensionContribution, salary)

  const taxBreaksTotal = taxBreaks.reduce((accum, item) => math.add(accum, item.amount), 0)
  tax.taxableIncome = math.chain(salary)
    .subtract(tax.taxFreePersonalAllowance)
    .subtract(annualPersonalPensionContribution)
    .subtract(taxBreaksTotal)
    .done()

  let carryOver = tax.taxableIncome

  for (const band of BANDS) {
    const difference = math.subtract(tax[band].end, tax[band].start)

    if (math.subtract(carryOver, difference) > 0) {
      tax[band].taxPaid = math.multiply(difference, tax[band].taxPercent)
      tax.totalIncomeTax = math.add(tax.totalIncomeTax, tax[band].taxPaid)
      tax[band].carryOver = math.subtract(carryOver, difference)
      carryOver = math.subtract(carryOver, difference)

    } else {
      tax[band].taxPaid = math.multiply(carryOver, tax[band].taxPercent) > 0 
        ? math.multiply(carryOver, tax[band].taxPercent) 
        : 0

      tax.totalIncomeTax = math.add(tax.totalIncomeTax, tax[band].taxPaid)
      carryOver = 0
      break
    }
  }
  console.log(tax)
  return tax
}

export default calculateTax
