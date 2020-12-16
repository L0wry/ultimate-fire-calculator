import { calculateYearlyCompoundWithCharge } from '../utils/calculateCompoundInterest';

export class Investment {
  constructor({
    investmentName,
    investmentType,
    initialAmount = 0,
    expectedReturn = 0,
    monthlyContribution = 0,
    noOfYearsToMature = 10,
    annualCharge = 0,
    compoundData = 0,
    isOverAnnualAllowance = false,
    stopContributingInYear
  }) {
    this._investmentName = investmentName;
    this._investmentType = investmentType;
    this._initialAmount = parseFloat(initialAmount);
    this._expectedReturn = parseFloat(expectedReturn);
    this._monthlyContribution = parseFloat(monthlyContribution);
    this._noOfYearsToMature = noOfYearsToMature;
    this._annualCharge = annualCharge;
    this._stopContributingInYear = stopContributingInYear

    this._compoundData = compoundData || calculateYearlyCompoundWithCharge({
      initialAmount: this._initialAmount,
      expectedReturn: this._expectedReturn,
      monthlyContribution: this._monthlyContribution,
      annualCharge: this._annualCharge,
      noOfYearsToMature: this._noOfYearsToMature,
      stopContributingInYear: this._stopContributingInYear
    });

    this._isOverAnnualAllowance = isOverAnnualAllowance;
    this._editMode = false;
  }

  get stopContributingInYear() {
    return this._stopContributingInYear
  }

  set stopContributingInYear(year) {
    this._stopContributingInYear = year
  }

  get isOverAnnualAllowance() {
    return this._isOverAnnualAllowance;
  }

  set isOverAnnualAllowance(bool) {
    this._isOverAnnualAllowance = bool;
  }

  get investmentName() {
    return this._investmentName;
  }

  get investmentType() {
    return this._investmentType;
  }

  get compoundData() {
    return this._compoundData;
  }

  set monthlyContribution(amount) {
    this._monthlyContribution = amount;
    this._compoundData = calculateYearlyCompoundWithCharge({
      initialAmount: this._initialAmount,
      expectedReturn: this._expectedReturn,
      monthlyContribution: this._monthlyContribution,
      annualCharge: this._annualCharge,
      noOfYearsToMature: this._noOfYearsToMature,
      stopContributingInYear: this._stopContributingInYear
    });
  }

  get editMode() {
    return this._editMode;
  }

  set editMode(bool) {
    this._editMode = bool;
  }

  set noOfYearsToMature(years) {
    this._noOfYearsToMature = years;
    this._compoundData = calculateYearlyCompoundWithCharge({
      initialAmount: this._initialAmount,
      expectedReturn: this._expectedReturn,
      monthlyContribution: this._monthlyContribution,
      annualCharge: this._annualCharge,
      noOfYearsToMature: this._noOfYearsToMature,
      stopContributingInYear: this._stopContributingInYear
    });
  }

  get monthlyContribution() {
    return this._monthlyContribution;
  }

  get initialAmount() {
    return this._initialAmount;
  }

  get expectedReturn() {
    return this._expectedReturn;
  }

  get annualCharge() {
    return this._annualCharge;
  }
}
