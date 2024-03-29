/* globals describe it expect */
import calculateAllTax from './calculateAllTax';
import { calculateIncomeTax } from './calculateIncomeTax';

describe('calculateAllTax', () => {
  
  
  it('Taxes 60% at 100k', () => {
    const salary = 125000;
    const tax = calculateAllTax({salary});
    expect(tax.incomeTax.taxFreePersonalAllowanceRemovedBy100kTax).toBe(12500);
  });


  it('matches the snapshot without pension', () => {
    expect(calculateAllTax({
      salary: 90000,
      taxFreePersonalAllowance: 12500
    })).toStrictEqual({"employerPensionContribution": 0, "employerPensionContributionPercent": 0, "incomeTax": {"bottom": {"carryOver": 77500, "end": 12500, "start": 0, "taxPaid": 0, "taxPercent": 0}, "hundredKLower": {"carryOver": 0, "end": 125000, "start": 100000.01, "taxPaid": 0, "taxPercent": 0.6}, "hundredKUpper": {"carryOver": 0, "end": 150000, "start": 125000.01, "taxPaid": 0, "taxPercent": 0.4}, "lowerBand": {"carryOver": 40000.01, "end": 50000, "start": 12500.01, "taxPaid": 7500, "taxPercent": 0.2}, "mediumBand": {"carryOver": 0, "end": 100000, "start": 50000.01, "taxPaid": 16000, "taxPercent": 0.4}, "taxFreePersonalAllowance": 12500, "totalIncomeTax": 23500, "upperBand": {"carryOver": 0, "end": 99999999, "start": 150000.01, "taxPaid": 0, "taxPercent": 0.45}}, "nationalInsuranceTax": {"lowerBand": {"carryOver": 1547.7692307692307, "end": 183, "start": 0, "taxPaid": 0, "taxPercent": 0}, "mediumBand": {"carryOver": 768.7792307692307, "end": 962, "start": 183.01, "taxPaid": 4860.96, "taxPercent": 0.12}, "totalNationalInsuranceTax": 5660.72, "upperBand": {"carryOver": 0, "end": 99999999, "start": 962.01, "taxPaid": 799.76, "taxPercent": 0.02}, "weeklyNationalInsuranceTax": 108.86}, "personalPensionContribution": 0, "personalPensionContributionPercent": 0, "salary": 90000, "secondaryIncomeAfterTax": 0, "studentLoan": {"monthlyAmountPaid": 0, "studentLoanPlanType": 0, "yearlyAmountPaid": 0}, "taxBreaksTotal": 0, "taxableIncome": 77500, "totalTakeHome": 60839.28});
  });

  it('matches the snapshot with pension', () => {
    expect(calculateAllTax({
      salary: 90000,
      taxFreePersonalAllowance: 12500,
      employerPensionContributionPercent: 10
    })).toStrictEqual({"employerPensionContribution": 900000, "employerPensionContributionPercent": 10, "incomeTax": {"bottom": {"carryOver": 77500, "end": 12500, "start": 0, "taxPaid": 0, "taxPercent": 0}, "hundredKLower": {"carryOver": 0, "end": 125000, "start": 100000.01, "taxPaid": 0, "taxPercent": 0.6}, "hundredKUpper": {"carryOver": 0, "end": 150000, "start": 125000.01, "taxPaid": 0, "taxPercent": 0.4}, "lowerBand": {"carryOver": 40000.01, "end": 50000, "start": 12500.01, "taxPaid": 7500, "taxPercent": 0.2}, "mediumBand": {"carryOver": 0, "end": 100000, "start": 50000.01, "taxPaid": 16000, "taxPercent": 0.4}, "taxFreePersonalAllowance": 12500, "totalIncomeTax": 23500, "upperBand": {"carryOver": 0, "end": 99999999, "start": 150000.01, "taxPaid": 0, "taxPercent": 0.45}}, "nationalInsuranceTax": {"lowerBand": {"carryOver": 1547.7692307692307, "end": 183, "start": 0, "taxPaid": 0, "taxPercent": 0}, "mediumBand": {"carryOver": 768.7792307692307, "end": 962, "start": 183.01, "taxPaid": 4860.96, "taxPercent": 0.12}, "totalNationalInsuranceTax": 5660.72, "upperBand": {"carryOver": 0, "end": 99999999, "start": 962.01, "taxPaid": 799.76, "taxPercent": 0.02}, "weeklyNationalInsuranceTax": 108.86}, "personalPensionContribution": 0, "personalPensionContributionPercent": 0, "salary": 90000, "secondaryIncomeAfterTax": 0, "studentLoan": {"monthlyAmountPaid": 0, "studentLoanPlanType": 0, "yearlyAmountPaid": 0}, "taxBreaksTotal": 0, "taxableIncome": 77500, "totalTakeHome": 60839.28});
  });

  it('matches the snapshot with student Loan', () => {
    expect(calculateAllTax({
      salary: 90000,
      taxFreePersonalAllowance: 12500,
      employerPensionContributionPercent: 10,
      studentLoanPlanType: 2
    })).toStrictEqual({"employerPensionContribution": 900000, "employerPensionContributionPercent": 10, "incomeTax": {"bottom": {"carryOver": 77500, "end": 12500, "start": 0, "taxPaid": 0, "taxPercent": 0}, "hundredKLower": {"carryOver": 0, "end": 125000, "start": 100000.01, "taxPaid": 0, "taxPercent": 0.6}, "hundredKUpper": {"carryOver": 0, "end": 150000, "start": 125000.01, "taxPaid": 0, "taxPercent": 0.4}, "lowerBand": {"carryOver": 40000.01, "end": 50000, "start": 12500.01, "taxPaid": 7500, "taxPercent": 0.2}, "mediumBand": {"carryOver": 0, "end": 100000, "start": 50000.01, "taxPaid": 16000, "taxPercent": 0.4}, "taxFreePersonalAllowance": 12500, "totalIncomeTax": 23500, "upperBand": {"carryOver": 0, "end": 99999999, "start": 150000.01, "taxPaid": 0, "taxPercent": 0.45}}, "nationalInsuranceTax": {"lowerBand": {"carryOver": 1547.7692307692307, "end": 183, "start": 0, "taxPaid": 0, "taxPercent": 0}, "mediumBand": {"carryOver": 768.7792307692307, "end": 962, "start": 183.01, "taxPaid": 4860.96, "taxPercent": 0.12}, "totalNationalInsuranceTax": 5660.72, "upperBand": {"carryOver": 0, "end": 99999999, "start": 962.01, "taxPaid": 799.76, "taxPercent": 0.02}, "weeklyNationalInsuranceTax": 108.86}, "personalPensionContribution": 0, "personalPensionContributionPercent": 0, "salary": 90000, "secondaryIncomeAfterTax": 0, "studentLoan": {"monthlyAmountPaid": 475.69, "studentLoanPlanType": 2, "yearlyAmountPaid": 5708.25}, "taxBreaksTotal": 0, "taxableIncome": 77500, "totalTakeHome": 55131.03});
  });
});
