import { all, create } from 'mathjs'

const BANDS = ['lowerBand', 'mediumBand', 'upperBand']

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

export const calculateNationalInsurance = (tax, taxableIncome) => {
  const weeksInYear = 52
  const weeklyIncome = math.divide(taxableIncome, weeksInYear)

  let carryOver = weeklyIncome

  for (const band of BANDS) {
    const difference = math.subtract(tax[band].end, tax[band].start)
    console.log(`${band} difference `, difference)
    if (math.subtract(carryOver, difference) > 0) {
      tax[band].taxPaid = math.multiply(difference, tax[band].taxPercent)
      tax.weeklyNationalInsuranceTax = math.add(tax.weeklyNationalInsuranceTax, tax[band].taxPaid)
      console.log(`${band} difference `, band)

      tax[band].carryOver = math.subtract(carryOver, difference)
      carryOver = math.subtract(carryOver, difference)

    } else {
      tax[band].taxPaid = math.multiply(carryOver, tax[band].taxPercent) > 0
        ? math.multiply(carryOver, tax[band].taxPercent)
        : 0

      tax.weeklyNationalInsuranceTax = math.add(tax.weeklyNationalInsuranceTax, tax[band].taxPaid)
      carryOver = 0
      break
    }
  }

  tax.totalNationalInsuranceTax = math.multiply(tax.weeklyNationalInsuranceTax, weeksInYear)
  return tax
}

