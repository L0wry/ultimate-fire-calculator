import calculateTax from './calculateTax'

describe('Calculate Tax', () => {

  it("calculates 20 % correctly without pensions", () => {
     expect(calculateTax({salary: 90050}).lowerBand.taxPaid).toBe(7703.998)
  })
})
