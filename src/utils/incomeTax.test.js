import calculateTax from './calculateTax'
import { incomeTax } from './taxTypes'

describe('Calculate Tax', () => {

  it("calculates taxable income with changing personal allowance", () => {
    const taxFreePersonalAllowance = 11480
    expect(calculateTax(incomeTax(taxFreePersonalAllowance), { salary: 90050 }).taxableIncome).toBe(78570)
    expect(calculateTax(incomeTax(), { salary: 90050 }).taxableIncome).toBe(77550)
  })

  it("calculates lower band correctly when due without pensions", () => {
    expect(calculateTax(incomeTax(), { salary: 90050 }).lowerBand.taxPaid).toBe(7499.998)
  })

  it("calculates lower band correctly when not due without pensions", () => {
    expect(calculateTax(incomeTax(), { salary: 1000 }).lowerBand.taxPaid).toBe(0)
  })

  it("calculates medium band correctly when due without pensions", () => {
    expect(calculateTax(incomeTax(), { salary: 90050 }).mediumBand.taxPaid).toBe(16020.004)
  })

  it("calculates medium band correctly when due without pensions", () => {
    expect(calculateTax(incomeTax(), { salary: 49999 }).mediumBand.taxPaid).toBe(0)
  })

  it("calculates upper band correctly when not due without pensions", () => {
    expect(calculateTax(incomeTax(), { salary: 149999 }).upperBand.taxPaid).toBe(0)
  })

  it("calculates upper band correctly when due without pensions", () => {
    expect(calculateTax(incomeTax(), { salary: 160000 }).upperBand.taxPaid).toBe(4500.009000000008)
  })

  it("calculates total tax due", () => {
    expect(calculateTax(incomeTax(), { salary: 160000 }).totalIncomeTax).toBe(52000.003000000004)
  })

  it("reduces personal pension from taxable income", () => {
    expect(calculateTax(incomeTax(), { salary: 100000, personalPensionContribution: 0.1 }).taxableIncome).toBe(77500)
    expect(calculateTax(incomeTax(), { salary: 100000, personalPensionContribution: 0.1 }).totalIncomeTax).toBe(23500.002)
  })

  it("reduces tax breaks from taxable income", () => {
    const taxBreaks = [
      { name: 'cycle to work', amount: 500 },
      { name: 'child care', amount: 100 }
    ]
    expect(calculateTax(incomeTax(), { salary: 100000 }, taxBreaks).taxableIncome).toBe(86900)
  })
})
