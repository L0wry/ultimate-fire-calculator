import calculateNationalInsurance from './calculateNationalInsurance'
import { nationalInsuranceTax } from './taxTypes'

describe('Calculate National Insurance', () => {

  it("calculates taxable income with changing personal allowance", () => {
    const taxFreePersonalAllowance = 11480
    expect(calculateNationalInsurance(nationalInsuranceTax(), { salary: 90050 }).taxableIncome).toBe(78570)
    expect(calculateNationalInsurance(nationalInsuranceTax(), { salary: 90050 }).taxableIncome).toBe(77550)
  })

})
