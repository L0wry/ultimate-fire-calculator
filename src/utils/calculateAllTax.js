import { all, create } from 'mathjs';
import { calculatePreTaxDeductions } from './calculatePreTaxDeductions';
import { calculateIncomeTax } from './calculateIncomeTax';
import { incomeTaxBands, nationalInsuranceTaxBands } from './taxTypes';
import { calculateNationalInsurance } from './calculateNationalInsurance';
import { calculateStudentLoan } from './calculateStudentLoan';

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
  secondaryIncomeAfterTax = 0
}) {

  const personalPensionContribution = math.multiply(personalPensionContributionPercent, salary);
  const employerPensionContribution = math.multiply(employerPensionContributionPercent, salary);
  const { monthlyAmountPaid, yearlyAmountPaid } = calculateStudentLoan({ studentLoanPlanType, salary });
  let { taxBreaksTotal, taxableIncome } = calculatePreTaxDeductions({ taxFreePersonalAllowance, salary, personalPensionContribution }); // TODO : Tax breaks

  const taxBands = incomeTaxBands(taxFreePersonalAllowance)
  const nationalInsuranceTax = calculateNationalInsurance(nationalInsuranceTaxBands, taxableIncome);
  const isSalaryOver100k = taxableIncome > 100000;

  if (isSalaryOver100k) {
    const amountOver = math.subtract(taxableIncome, 100000);

    const amountToRemoveFromPersonalAllowance = Math.floor(math.multiply(amountOver, .5));
    taxBands.taxFreePersonalAllowanceRemovedBy100kTax = amountToRemoveFromPersonalAllowance > taxBands.taxFreePersonalAllowance ? taxBands.taxFreePersonalAllowance : amountToRemoveFromPersonalAllowance;
  }

  const incomeTax = calculateIncomeTax(taxBands, taxableIncome);

  taxableIncome = math.subtract(taxableIncome, taxFreePersonalAllowance) > 0
  ? math.subtract(taxableIncome, taxBands.taxFreePersonalAllowance)
  : 0;

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
      .add(secondaryIncomeAfterTax)
      .round(2)
      .done()
  };
}
