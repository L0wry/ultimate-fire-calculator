import { calculateNationalInsurance } from './calculateNationalInsurance';
import { nationalInsuranceTaxBands } from './taxTypes'

describe('Calculate National Insurance', () => {
  it.only('works', () => {
    const taxableIncome = 90000.00
    expect(calculateNationalInsurance(nationalInsuranceTaxBands, taxableIncome)).toEqual({ "lowerBand": { "carryOver": 1547.7692307692307, "end": 183, "start": 0, "taxPaid": 0, "taxPercent": 0 }, "mediumBand": { "carryOver": 768.7792307692307, "end": 962, "start": 183.01, "taxPaid": 93.47879999999999, "taxPercent": 0.12 }, "totalNationalInsuranceTax": 5660.427999999999, "upperBand": { "carryOver": 0, "end": 99999999, "start": 962.01, "taxPaid": 15.375584615384614, "taxPercent": 0.02 }, "weeklyNationalInsuranceTax": 108.8543846153846 })
  })
})
