const calculateTax = ({ salary = 0, employerPensionContribution = 0, personalPensionContribution = 0 }) => {

  const taxFreePersonalAllowance = 11480
  const annualPersonalPensionContribution = personalPensionContribution * salary

  const taxableIncome = salary - taxFreePersonalAllowance - annualPersonalPensionContribution
  console.log('taxable income', taxableIncome)

  const tax = {
    taxableIncome,
    bands: ['lowerBand', 'mediumBand', 'upperBand'],
    lowerBand: {
      taxPercent: .2,
      start: taxFreePersonalAllowance + 0.01,
      end: 50000,
      taxPaid: 0,
      carryOver: 0
    },
    mediumBand: {
      taxPercent: .4,
      start: 50000.01,
      end: 150000,
      taxPaid: 0,
      carryOver: 0
    },
    upperBand: {
      taxPercent: .45,
      start: 150000.01,
      end: 99999999,
      taxPaid: 0,
      carryOver: 0
    }
  }


  let carryOver = taxableIncome

  for (const band of tax.bands) {
    const difference = tax[band].end - tax[band].start
    console.log(`differnce for band ${band}`, difference)

    if (carryOver - difference > 0) {
      tax[band].taxPaid = difference * tax[band].taxPercent
      console.log(`tax paid for band ${band}`, tax[band].taxPaid)
      if (carryOver - difference > 0) {
        tax[band].carryOver = carryOver - difference
        carryOver = carryOver - difference
        console.log(`carry over for band ${band}`, tax[band].carryOver)
      }
    } else {
      console.log(`this is our last tax bracket ${band}: remainder : ${carryOver}`)
      //carry over * tax percent
      tax[band].taxPaid = carryOver * tax[band].taxPercent
      carryOver = 0
      break
    }

  }

  console.log(tax)
  return tax

}

export default calculateTax
