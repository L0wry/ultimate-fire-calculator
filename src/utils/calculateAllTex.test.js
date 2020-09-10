import calculateAllTax from './calculateAllTax'

describe('calculateAllTax', () => {
  it('matches the snapshot without pension', () => {
    expect(calculateAllTax({
      salary: 90000,
      taxFreePersonalAllowance: 12500
    })).toStrictEqual({"employerPensionContribution": 0, "employerPensionContributionPercent": 0, "incomeTax": {"lowerBand": {"carryOver": 40000.01, "end": 50000, "start": 12500.01, "taxPaid": 7500, "taxPercent": 0.2}, "mediumBand": {"carryOver": 0, "end": 150000, "start": 50000.01, "taxPaid": 16000, "taxPercent": 0.4}, "taxFreePersonalAllowance": 12500, "totalIncomeTax": 23500, "upperBand": {"carryOver": 0, "end": 99999999, "start": 150000.01, "taxPaid": 0, "taxPercent": 0.45}}, "nationalInsuranceTax": {"lowerBand": {"carryOver": 1547.7692307692307, "end": 183, "start": 0, "taxPaid": 0, "taxPercent": 0}, "mediumBand": {"carryOver": 768.7792307692307, "end": 962, "start": 183.01, "taxPaid": 93.47879999999999, "taxPercent": 0.12}, "totalNationalInsuranceTax": 5660.427999999999, "upperBand": {"carryOver": 0, "end": 99999999, "start": 962.01, "taxPaid": 15.375584615384614, "taxPercent": 0.02}, "weeklyNationalInsuranceTax": 108.8543846153846}, "personalPensionContribution": 0, "personalPensionContributionPercent": 0, "salary": 90000, "taxBreaksTotal": 0, "taxableIncome": 90000, "totalTakeHome": 60839.57})
  })

  it('matches the snapshot with pension', () => {
    expect(calculateAllTax({
      salary: 90000,
      taxFreePersonalAllowance: 12500,
      employerPensionContributionPercent: 10
    })).toStrictEqual({"employerPensionContribution": 900000, "employerPensionContributionPercent": 10, "incomeTax": {"lowerBand": {"carryOver": 40000.01, "end": 50000, "start": 12500.01, "taxPaid": 7500, "taxPercent": 0.2}, "mediumBand": {"carryOver": 0, "end": 150000, "start": 50000.01, "taxPaid": 16000, "taxPercent": 0.4}, "taxFreePersonalAllowance": 12500, "totalIncomeTax": 23500, "upperBand": {"carryOver": 0, "end": 99999999, "start": 150000.01, "taxPaid": 0, "taxPercent": 0.45}}, "nationalInsuranceTax": {"lowerBand": {"carryOver": 1547.7692307692307, "end": 183, "start": 0, "taxPaid": 0, "taxPercent": 0}, "mediumBand": {"carryOver": 768.7792307692307, "end": 962, "start": 183.01, "taxPaid": 93.47879999999999, "taxPercent": 0.12}, "totalNationalInsuranceTax": 11320.855999999998, "upperBand": {"carryOver": 0, "end": 99999999, "start": 962.01, "taxPaid": 15.375584615384614, "taxPercent": 0.02}, "weeklyNationalInsuranceTax": 217.7087692307692}, "personalPensionContribution": 0, "personalPensionContributionPercent": 0, "salary": 90000, "taxBreaksTotal": 0, "taxableIncome": 90000, "totalTakeHome": 55179.14})
  })
})
