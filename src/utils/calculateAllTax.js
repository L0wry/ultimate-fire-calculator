import { all, create } from 'mathjs'
import { calculatePreTaxDeductions } from './calculatePreTaxDeductions'
import { calculateIncomeTax } from './calculateIncomeTax'
import { incomeTaxBands, nationalInsuranceTaxBands } from './taxTypes';
import { calculateNationalInsurance } from './calculateNationalInsurance'
import { calculateStudentLoan } from './calculateStudentLoan'

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

export default function calculateAllTax({
  salary = 0,
  taxFreePersonalAllowance = 12500,
  employerPensionContributionPercent = 0,
  personalPensionContributionPercent = 0,
  studentLoanPlanType = 0 }) {


  const personalPensionContribution = math.multiply(personalPensionContributionPercent, salary)
  const employerPensionContribution = math.multiply(employerPensionContributionPercent, salary)
  const { monthlyAmountPaid, yearlyAmountPaid } = calculateStudentLoan({ studentLoanPlanType , salary})
  const { taxBreaksTotal, taxableIncome } = calculatePreTaxDeductions({ taxFreePersonalAllowance, salary, personalPensionContribution }) //TODO : Tax breaks

  const incomeTax = calculateIncomeTax(incomeTaxBands(taxFreePersonalAllowance), taxableIncome)
  const nationalInsuranceTax = calculateNationalInsurance(nationalInsuranceTaxBands, taxableIncome)

  return {
    salary,
    studentLoan: {
      studentLoanPlanType,
      monthlyAmountPaid,
      yearlyAmountPaid
    },
    employerPensionContributionPercent,
    personalPensionContributionPercent,
    personalPensionContribution,
    employerPensionContribution,
    taxBreaksTotal,
    taxableIncome,
    incomeTax,
    nationalInsuranceTax,
    totalTakeHome: math
      .chain(salary)
      .subtract(personalPensionContribution)
      .subtract(incomeTax.totalIncomeTax)
      .subtract(nationalInsuranceTax.totalNationalInsuranceTax)
      .subtract(yearlyAmountPaid)
      .round(2)
      .done()
  }
}
