import { calculateStudentLoan } from './calculateStudentLoan'

describe('Student Loan', () => {

  it('should not return empty for plan 0', ()  => {
    const studentLoanToCalculate = {
      studentLoanPlanType: 0,
      salary: 5000
    }
    expect(calculateStudentLoan(studentLoanToCalculate)).toEqual({
      monthlyAmountPaid: 0,
      yearlyAmountPaid: 0
    })
  })

  describe('Plan 1', () => {
    it('should not kick in below the the threshold', ()  => {
      const studentLoanToCalculate = {
        studentLoanPlanType: 1,
        salary: 19390
      }
      expect(calculateStudentLoan(studentLoanToCalculate)).toEqual({
        monthlyAmountPaid: 0,
        yearlyAmountPaid: 0
      })
    })
  
    it('should kick in above the threshold', () => {
      const studentLoanToCalculate = {
        studentLoanPlanType: 1,
        salary: 19400
      }
      expect(calculateStudentLoan(studentLoanToCalculate)).toEqual({
        monthlyAmountPaid: 0.08,
        yearlyAmountPaid: 0.9
      })
    })
  
    it('should work', () => {
      const studentLoanToCalculate = {
        studentLoanPlanType: 1,
        salary: 40000
      }
      expect(calculateStudentLoan(studentLoanToCalculate)).toEqual({
        monthlyAmountPaid: 154.58,
        yearlyAmountPaid: 1854.9
      })
    })
  })


  describe('Plan 2', () => {
    it('should not kick in below the the threshold', ()  => {
      const studentLoanToCalculate = {
        studentLoanPlanType: 2,
        salary: 26575
      }
      expect(calculateStudentLoan(studentLoanToCalculate)).toEqual({
        monthlyAmountPaid: 0,
        yearlyAmountPaid: 0
      })
    })
  
    it('should kick in above the threshold', () => {
      const studentLoanToCalculate = {
        studentLoanPlanType: 2,
        salary: 26600
      }
      expect(calculateStudentLoan(studentLoanToCalculate)).toEqual({
        monthlyAmountPaid: 0.19,
        yearlyAmountPaid: 2.25
      })
    })
  
    it('should work', () => {
      const studentLoanToCalculate = {
        studentLoanPlanType: 2,
        salary: 40000
      }
      expect(calculateStudentLoan(studentLoanToCalculate)).toEqual({
        monthlyAmountPaid: 100.69,
        yearlyAmountPaid: 1208.25
      })
    })
  })
})
