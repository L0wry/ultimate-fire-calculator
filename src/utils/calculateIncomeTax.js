import {all, create} from 'mathjs'

const BANDS = ['lowerBand', 'mediumBand', 'upperBand']

const math = create(all, {
  number: 'BigNumber',  
  precision: 32
});

export const calculateIncomeTax = (tax, taxableIncome) => {
  taxableIncome = math.subtract(taxableIncome, tax.taxFreePersonalAllowance)
  
  let carryOver = taxableIncome

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

  return tax
}

