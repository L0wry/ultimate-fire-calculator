import { calculateNationalInsurance } from './calculateNationalInsurance';
import { nationalInsuranceTaxBands } from './taxTypes'

describe('Calculate National Insurance', () => {


  it("calculates lower band correctly with the default tax free amount", () => {
    const taxableIncome = 77550
    expect(calculateNationalInsurance(nationalInsuranceTaxBands, taxableIncome).lowerBand).toStrictEqual({"carryOver": 1308.3461538461538, "end": 183, "start": 0, "taxPaid": 0, "taxPercent": 0})
  })

  it("calculates lower band correctly with a lower tax free amount", () => {
    const taxableIncome = 77550
    expect(calculateNationalInsurance(nationalInsuranceTaxBands, taxableIncome).lowerBand).toStrictEqual({"carryOver": 1308.3461538461538, "end": 183, "start": 0, "taxPaid": 0, "taxPercent": 0})
  })

  it("calculates lower band correctly with a salary under the tax free threshold", () => {
    const taxableIncome = 10000
    expect(calculateNationalInsurance(nationalInsuranceTaxBands, taxableIncome).lowerBand).toStrictEqual({"carryOver": 9.30769230769232, "end": 183, "start": 0, "taxPaid": 0, "taxPercent": 0})
  })

  it("calculates medium band correctly with the default tax free amount", () => {
    const taxableIncome = 77550
    expect(calculateNationalInsurance(nationalInsuranceTaxBands, taxableIncome).mediumBand).toStrictEqual({"carryOver": 529.3561538461538, "end": 962, "start": 183.01, "taxPaid": 93.48, "taxPercent": 0.12})
  })

  it("calculates medium band correctly with a lower tax free amount", () => {
    const taxableIncome = 77550
    expect(calculateNationalInsurance(nationalInsuranceTaxBands, taxableIncome).mediumBand).toStrictEqual({"carryOver": 529.3561538461538, "end": 962, "start": 183.01, "taxPaid": 93.48, "taxPercent": 0.12})
  })


  it("calculates upper band correctly with without reaching the band with the default tax free amount", () => {
    const taxableIncome = 77550
    expect(calculateNationalInsurance(nationalInsuranceTaxBands, taxableIncome).upperBand).toStrictEqual({"carryOver": 0, "end": 99999999, "start": 962.01, "taxPaid": 10.59, "taxPercent": 0.02})
  })

  it("calculates upper band correctly with a lower tax free amount", () => {
    const taxableIncome = 77550
    expect(calculateNationalInsurance(nationalInsuranceTaxBands, taxableIncome).upperBand).toStrictEqual({"carryOver": 0, "end": 99999999, "start": 962.01, "taxPaid": 10.59, "taxPercent": 0.02})
  })

  it("calculates upper band correctly", () => {
    const taxableIncome = 200000
    expect(calculateNationalInsurance(nationalInsuranceTaxBands, taxableIncome).upperBand).toStrictEqual({"carryOver": 0, "end": 99999999, "start": 962.01, "taxPaid": 57.68, "taxPercent": 0.02})
  })

  it('Matches the snapshot', () => {
    const taxableIncome = 200000
    expect(calculateNationalInsurance(nationalInsuranceTaxBands, taxableIncome)).toStrictEqual({
      "lowerBand": {"carryOver": 3663.153846153846, "end": 183, "start": 0, "taxPaid": 0, "taxPercent": 0}, 
      "mediumBand": {"carryOver": 2884.163846153846, "end": 962, "start": 183.01, "taxPaid": 93.48, "taxPercent": 0.12}, 
      "totalNationalInsuranceTax": 7860.32,
      "upperBand": {"carryOver": 0, "end": 99999999, "start": 962.01, "taxPaid": 57.68, "taxPercent": 0.02}, 
      "weeklyNationalInsuranceTax": 151.16
    })
  })
})
