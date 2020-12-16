export const incomeTaxBands = (taxFreePersonalAllowance = 12500) => ({
  taxFreePersonalAllowance,
  totalIncomeTax: 0,
  lowerBand: {
    taxPercent: 0.2,
    start: taxFreePersonalAllowance + 0.01,
    end: 50000,
    taxPaid: 0,
    carryOver: 0
  },
  mediumBand: {
    taxPercent: 0.4,
    start: 50000.01,
    end: 150000,
    taxPaid: 0,
    carryOver: 0
  },
  upperBand: {
    taxPercent: 0.45,
    start: 150000.01,
    end: 99999999,
    taxPaid: 0,
    carryOver: 0
  }
});

export const nationalInsuranceTaxBands = {
  totalNationalInsuranceTax: 0,
  weeklyNationalInsuranceTax: 0,
  lowerBand: {
    taxPercent: 0,
    start: 0,
    end: 183,
    taxPaid: 0,
    carryOver: 0
  },
  mediumBand: {
    taxPercent: 0.12,
    start: 183.01,
    end: 962.00,
    taxPaid: 0,
    carryOver: 0
  },
  upperBand: {
    taxPercent: 0.02,
    start: 962.01,
    end: 99999999,
    taxPaid: 0,
    carryOver: 0
  }
};
