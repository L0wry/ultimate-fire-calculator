import { calculateIncomeTax } from './calculateIncomeTax'
import { incomeTaxBands } from './taxTypes'

describe('Calculate Tax', () => {

  it("calculates lower band correctly with the default tax free amount", () => {
    const taxableIncome = 77550
    expect(calculateIncomeTax(incomeTaxBands(), taxableIncome).lowerBand).toStrictEqual({ "carryOver": 27550.010000000002, "end": 50000, "start": 12500.01, "taxPaid": 7499.998, "taxPercent": 0.2 })
  })

  it("calculates lower band correctly with a lower tax free amount", () => {
    const taxFreePersonalAllowance = 10480
    const taxableIncome = 77550
    expect(calculateIncomeTax(incomeTaxBands(taxFreePersonalAllowance), taxableIncome).lowerBand).toStrictEqual({ "carryOver": 27550.010000000002, "end": 50000, "start": 10480.01, "taxPaid": 7903.998, "taxPercent": 0.2 })
  })

  it("calculates lower band correctly with a salary under the tax free threshold", () => {
    const taxableIncome = 10000
    expect(calculateIncomeTax(incomeTaxBands(), taxableIncome).lowerBand).toStrictEqual({ "carryOver": 0, "end": 50000, "start": 12500.01, "taxPaid": 0, "taxPercent": 0.2 })
  })

  it("calculates medium band correctly with the default tax free amount", () => {
    const taxableIncome = 77550
    expect(calculateIncomeTax(incomeTaxBands(), taxableIncome).mediumBand).toStrictEqual({ "carryOver": 0, "end": 150000, "start": 50000.01, "taxPaid": 11020.004, "taxPercent": 0.4 })
  })

  it("calculates medium band correctly with a lower tax free amount", () => {
    const taxFreePersonalAllowance = 10480
    const taxableIncome = 77550
    expect(calculateIncomeTax(incomeTaxBands(taxFreePersonalAllowance), taxableIncome).mediumBand).toStrictEqual({ "carryOver": 0, "end": 150000, "start": 50000.01, "taxPaid": 11020.004, "taxPercent": 0.4 })
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

  it("calculates upper band correctly", () => {
    const taxableIncome = 200000
    expect(calculateIncomeTax(incomeTaxBands(), taxableIncome).upperBand).toStrictEqual({ "carryOver": 0, "end": 99999999, "start": 150000.01, "taxPaid": 22500.00900000001, "taxPercent": 0.45 })
  })

  it('Matches the snapshot', () => {
    const taxableIncome = 200000
    expect(calculateIncomeTax(incomeTaxBands(), taxableIncome)).toStrictEqual({ 
    "lowerBand": { "carryOver": 150000.01, "end": 50000, "start": 12500.01, "taxPaid": 7499.998, "taxPercent": 0.2 }, 
    "mediumBand": { "carryOver": 50000.02000000002, "end": 150000, "start": 50000.01, "taxPaid": 39999.996, "taxPercent": 0.4 }, 
    "taxFreePersonalAllowance": 12500, 
    "totalIncomeTax": 70000.00300000001, 
    "upperBand": { "carryOver": 0, "end": 99999999, "start": 150000.01, "taxPaid": 22500.00900000001, "taxPercent": 0.45 } }
    )
  })

  // it("calculates medium band correctly when due without pensions", () => {
  //   expect(calculateTax(incomeTax(), { salary: 90050 }).mediumBand.taxPaid).toStrictEqual(16020.004)
  // })

  // it("calculates medium band correctly when due without pensions", () => {
  //   expect(calculateTax(incomeTax(), { salary: 49999 }).mediumBand.taxPaid).toStrictEqual(0)
  // })

  // it("calculates upper band correctly when not due without pensions", () => {
  //   expect(calculateTax(incomeTax(), { salary: 149999 }).upperBand.taxPaid).toStrictEqual(0)
  // })

  // it("calculates upper band correctly when due without pensions", () => {
  //   expect(calculateTax(incomeTax(), { salary: 160000 }).upperBand.taxPaid).toStrictEqual(4500.009000000008)
  // })

  // it("calculates total tax due", () => {
  //   expect(calculateTax(incomeTax(), { salary: 160000 }).totalIncomeTax).toStrictEqual(52000.003000000004)
  // })

  // it("reduces personal pension from taxable income", () => {
  //   expect(calculateTax(incomeTax(), { salary: 100000, personalPensionContribution: 0.1 }).taxableIncome).toStrictEqual(77500)
  //   expect(calculateTax(incomeTax(), { salary: 100000, personalPensionContribution: 0.1 }).totalIncomeTax).toStrictEqual(23500.002)
  // })

  // it("reduces tax breaks from taxable income", () => {
  //   const taxBreaks = [
  //     { name: 'cycle to work', amount: 500 },
  //     { name: 'child care', amount: 100 }
  //   ]
  //   expect(calculateTax(incomeTax(), { salary: 100000 }, taxBreaks).taxableIncome).toStrictEqual(86900)
  // })
})
