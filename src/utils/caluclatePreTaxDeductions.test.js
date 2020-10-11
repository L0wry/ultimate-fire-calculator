import { calculatePreTaxDeductions } from './calculatePreTaxDeductions'

describe('Pre Tax Deductions', () => {
  it('returns 0', () => {
    const userFinance = {salary: 0}
    expect(calculatePreTaxDeductions(userFinance)).toStrictEqual({"taxBreaksTotal": 0, "taxableIncome": 0})
  })

  it('takes off pension contribution', () => {
    const userFinance = {salary: 20000,personalPensionContribution: 10000 }
    expect(calculatePreTaxDeductions(userFinance)).toStrictEqual({"taxBreaksTotal": 0, "taxableIncome": 10000})
  })

  it('removes tax breaks', () => {
    const taxBreaks = [{name: 'cycle to work', amount: 500}, {name: 'other', amount: 1000}]
    const userFinance = {salary: 20000,personalPensionContribution: 0 }
    expect(calculatePreTaxDeductions(userFinance, taxBreaks)).toStrictEqual({"taxBreaksTotal": 1500, "taxableIncome": 18500})
  })


})
