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
  studentLoanPlanType = 0,
  secondaryIncomeAfterTax }) {


  const personalPensionContribution = math.multiply(personalPensionContributionPercent, salary)
  const employerPensionContribution = math.multiply(employerPensionContributionPercent, salary)
  const { monthlyAmountPaid, yearlyAmountPaid } = calculateStudentLoan({ studentLoanPlanType , salary})
  let { taxBreaksTotal, taxableIncome } = calculatePreTaxDeductions({ taxFreePersonalAllowance, salary, personalPensionContribution }) //TODO : Tax breaks

  const incomeTax = calculateIncomeTax(incomeTaxBands(taxFreePersonalAllowance), taxableIncome)
  
  
  const nationalInsuranceTax = calculateNationalInsurance(nationalInsuranceTaxBands, taxableIncome)
  
  taxableIncome = math.subtract(taxableIncome, taxFreePersonalAllowance) > 0
    ? math.subtract(taxableIncome, taxFreePersonalAllowance)
    : 0
    
  return {
    salary,
    studentLoan: {
      studentLoanPlanType,
      monthlyAmountPaid,
      yearlyAmountPaid
    },
    secondaryIncomeAfterTax,
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
      .add(math.divide(secondaryIncomeAfterTax, 12))
      .round(2)
      .done()
  }
}
