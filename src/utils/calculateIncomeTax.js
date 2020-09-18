import { all, create } from 'mathjs'

const BANDS = ['lowerBand', 'mediumBand', 'upperBand']

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

const ROUND_AMOUNT = 2

export const calculateIncomeTax = (tax, taxableIncome) => {

  const isSalaryOver100k = taxableIncome > 100000

  if (isSalaryOver100k) {
    const amountOver = math.subtract(taxableIncome, 100000)

    const amountToRemoveFromPersonalAllowance = Math.floor(math.divide(amountOver, 2))
    const newTaxFreeAmount = math.subtract(tax.taxFreePersonalAllowance, amountToRemoveFromPersonalAllowance) > 0 ?
      math.subtract(tax.taxFreePersonalAllowance, amountToRemoveFromPersonalAllowance) :
      0

    tax.taxFreePersonalAllowanceRemovedBy100kTax = amountToRemoveFromPersonalAllowance > tax.taxFreePersonalAllowance ? tax.taxFreePersonalAllowance : amountToRemoveFromPersonalAllowance
    tax.taxFreePersonalAllowance = newTaxFreeAmount
  }

  taxableIncome = math.subtract(taxableIncome, tax.taxFreePersonalAllowance)

  let carryOver = taxableIncome

  for (const band of BANDS) {
    const difference = math.subtract(tax[band].end, tax[band].start)

    if (math.subtract(carryOver, difference) > 0) {
      tax[band].taxPaid = math.round(math.multiply(difference, tax[band].taxPercent), ROUND_AMOUNT)
      tax.totalIncomeTax = math.add(tax.totalIncomeTax, tax[band].taxPaid)
      tax[band].carryOver = math.subtract(carryOver, difference)
      carryOver = math.subtract(carryOver, difference)

    } else {
      tax[band].taxPaid = math.multiply(carryOver, tax[band].taxPercent) > 0
        ? math.round(math.multiply(carryOver, tax[band].taxPercent), ROUND_AMOUNT)
        : 0

      tax.totalIncomeTax = math.round(math.add(tax.totalIncomeTax, tax[band].taxPaid), ROUND_AMOUNT)
      carryOver = 0
      break
    }
  }

  return tax
}

