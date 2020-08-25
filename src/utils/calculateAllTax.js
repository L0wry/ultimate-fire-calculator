import { all, create } from 'mathjs'
import { calculatePreTaxDeductions } from './calculatePreTaxDeductions'
import { calculateIncomeTax }  from './calculateIncomeTax'
import { incomeTaxBands, nationalInsuranceTaxBands} from './taxTypes';
import {calculateNationalInsurance }  from './calculateNationalInsurance'
const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

export default function calculateAllTax({
  salary = 0, 
  taxFreePersonalAllowance = 12500,
  employerPensionContributionPercent = 0,
  personalPensionContributionPercent = 0}) {


    const personalPensionContribution = math.multiply(personalPensionContributionPercent, salary)
    const employerPensionContribution = math.multiply(employerPensionContributionPercent, salary)
  
    const { taxBreaksTotal, taxableIncome} = calculatePreTaxDeductions({taxFreePersonalAllowance, salary, personalPensionContribution }) //TODO : Tax breaks

    const incomeTax = calculateIncomeTax(incomeTaxBands(taxFreePersonalAllowance), taxableIncome)
    const nationalInsuranceTax = calculateNationalInsurance(nationalInsuranceTaxBands, taxableIncome)
    
    return {
      salary,
      employerPensionContributionPercent,
      personalPensionContributionPercent,
      personalPensionContribution,
      employerPensionContribution,
      taxBreaksTotal,
      taxableIncome,
      incomeTax,
      nationalInsuranceTax,
      totalTakeHome: salary - personalPensionContribution - incomeTax.totalIncomeTax - nationalInsuranceTax.totalNationalInsuranceTax
    }
}
