export const incomeTax = (taxFreePersonalAllowance = 12500 ) => ({
  taxFreePersonalAllowance,
  personalPensionContribution: 0,
  employerPensionContribution: 0,
  taxableIncome: 0,
  totalIncomeTax: 0,
  taxBreaks: [],
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
})

export const nationalInsuranceTax = () => ({
  totalNationalInsuranceTax: 0,
  lowerBand: {
    taxPercent: .12,
    start: 183.01,
    end: 962.00,
    taxPaid: 0,
    carryOver: 0
  },
  upperBand: {
    taxPercent: .2,
    start: 962.01,
    end: 99999999,
    taxPaid: 0,
    carryOver: 0
  }
})
