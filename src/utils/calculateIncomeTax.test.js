import { calculateIncomeTax } from './calculateIncomeTax'
import { incomeTaxBands } from './taxTypes'

describe('Calculate Tax', () => {

  it("calculates lower band correctly with the default tax free amount", () => {
    const taxableIncome = 77550
    expect(calculateIncomeTax(incomeTaxBands(), taxableIncome).lowerBand).toStrictEqual({ "carryOver": 27550.010000000002, "end": 50000, "start": 12500.01, "taxPaid": 7500, "taxPercent": 0.2 })
  })

  it("calculates lower band correctly with a lower tax free amount", () => {
    const taxFreePersonalAllowance = 10480
    const taxableIncome = 77550
    expect(calculateIncomeTax(incomeTaxBands(taxFreePersonalAllowance), taxableIncome).lowerBand).toStrictEqual({ "carryOver": 27550.010000000002, "end": 50000, "start": 10480.01, "taxPaid": 7904, "taxPercent": 0.2 })
  })

  it("calculates lower band correctly with a salary under the tax free threshold", () => {
    const taxableIncome = 10000
    expect(calculateIncomeTax(incomeTaxBands(), taxableIncome).lowerBand).toStrictEqual({ "carryOver": 0, "end": 50000, "start": 12500.01, "taxPaid": 0, "taxPercent": 0.2 })
  })

  it("calculates medium band correctly with the default tax free amount", () => {
    const taxableIncome = 77550
    expect(calculateIncomeTax(incomeTaxBands(), taxableIncome).mediumBand).toStrictEqual({ "carryOver": 0, "end": 150000, "start": 50000.01, "taxPaid": 11020, "taxPercent": 0.4 })
  })

  it("calculates medium band correctly with a lower tax free amount", () => {
    const taxFreePersonalAllowance = 10480
    const taxableIncome = 77550
    expect(calculateIncomeTax(incomeTaxBands(taxFreePersonalAllowance), taxableIncome).mediumBand).toStrictEqual({ "carryOver": 0, "end": 150000, "start": 50000.01, "taxPaid": 11020, "taxPercent": 0.4 })
  })


  it("calculates upper band correctly with without reaching the band with the default tax free amount", () => {
    const taxableIncome = 77550
    expect(calculateIncomeTax(incomeTaxBands(), taxableIncome).upperBand).toStrictEqual({ "carryOver": 0, "end": 99999999, "start": 150000.01, "taxPaid": 0, "taxPercent": 0.45 })
  })

  it("calculates upper band correctly with a lower tax free amount", () => {
    const taxFreePersonalAllowance = 10480
    const taxableIncome = 77550
    expect(calculateIncomeTax(incomeTaxBands(taxFreePersonalAllowance), taxableIncome).upperBand).toStrictEqual({ "carryOver": 0, "end": 99999999, "start": 150000.01, "taxPaid": 0, "taxPercent": 0.45 })
  })


  it("reduces tax free personal allowence to 0 at 125000", () => {
    const taxableIncome = 125000
    const tax = calculateIncomeTax(incomeTaxBands(), taxableIncome)
    expect(tax.taxFreePersonalAllowanceRemovedBy100kTax).toBe(12500)
    expect(tax.taxFreePersonalAllowance).toBe(0)
  })


  it("calculates upper band correctly", () => {
    const taxableIncome = 200000
    expect(calculateIncomeTax(incomeTaxBands(), taxableIncome).upperBand).toStrictEqual({ "carryOver": 0, "end": 99999999, "start": 150000.01, "taxPaid": 28125.01, "taxPercent": 0.45 })
  })

  it('Matches the snapshot', () => {
    const taxableIncome = 200000
    expect(calculateIncomeTax(incomeTaxBands(), taxableIncome)).toStrictEqual({"lowerBand": {"carryOver": 162500.01, "end": 50000, "start": 12500.01, "taxPaid": 7500, "taxPercent": 0.2}, "mediumBand": {"carryOver": 62500.02000000002, "end": 150000, "start": 50000.01, "taxPaid": 40000, "taxPercent": 0.4}, "taxFreePersonalAllowance": 0, "taxFreePersonalAllowanceRemovedBy100kTax": 12500, "totalIncomeTax": 75625.01, "upperBand": {"carryOver": 0, "end": 99999999, "start": 150000.01, "taxPaid": 28125.01, "taxPercent": 0.45}})
  })
})
