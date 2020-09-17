import { all, create } from 'mathjs'

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

const PLAN_TYPES = {
  ONE: 1,
  TWO: 2
}

const PLAN_ONE_THRESHOLD = 19390
const PLAN_TWO_THRESHOLD = 26575
const PAYBACK_PERCENT = 9

const calculatePlanOne = ({ salary = 0 }) => {
  if (salary <= PLAN_ONE_THRESHOLD) {
    return {
      monthlyAmountPaid: 0,
      yearlyAmountPaid: 0
    }
  }

  const difference = math.subtract(salary, PLAN_ONE_THRESHOLD)
  const yearlyAmountPaid = math.chain(difference).divide(100).multiply(PAYBACK_PERCENT).round(2).done()

  return {
    monthlyAmountPaid: math.round(math.divide(yearlyAmountPaid, 12), 2),
    yearlyAmountPaid
  }
}

const calculatePlanTwo = ({ salary = 0 }) => {
  if (salary <= PLAN_TWO_THRESHOLD) {
    return {
      monthlyAmountPaid: 0,
      yearlyAmountPaid: 0
    }
  }

  const difference = math.subtract(salary, PLAN_TWO_THRESHOLD)
  const yearlyAmountPaid = math.chain(difference).divide(100).multiply(PAYBACK_PERCENT).round(2).done()

  return {
    monthlyAmountPaid: math.round(math.divide(yearlyAmountPaid, 12), 2),
    yearlyAmountPaid
  }
}

export const calculateStudentLoan = ({ studentLoanPlanType = 0, salary = 0 }) => {
  if (studentLoanPlanType === PLAN_TYPES.ONE) {
    return calculatePlanOne({ salary })
  } else if (studentLoanPlanType === PLAN_TYPES.TWO) {
    return calculatePlanTwo({ salary })
  }
  return {
    monthlyAmountPaid: 0,
    yearlyAmountPaid: 0
  }
}
