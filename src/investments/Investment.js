import { calculateYearlyCompoundWithCharge } from '../utils/calculateCompoundInterest';
import { all, create } from 'mathjs'

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

export class Investment {
  constructor({
    investmentType,
    initialAmount = 0,
    expectedReturn = 0,
    monthlyContribution =0,
    noOfYearsToMature = 10,
    annualCharge = 0,
    compoundData = 0,
  }) {

    this._investmentType = investmentType
    this._initialAmount = parseFloat(initialAmount)
    this._expectedReturn = math.round(math.divide(expectedReturn, 100), 2)
    this._monthlyContribution = parseFloat(monthlyContribution)
    this._noOfYearsToMature = noOfYearsToMature
    this._annualCharge = math.divide(annualCharge, 100)

    this._compoundData = compoundData || calculateYearlyCompoundWithCharge({
      initialAmount: this._initialAmount,
      expectedReturn: this._expectedReturn,
      monthlyContribution: this._monthlyContribution,
      annualCharge: this._annualCharge,
      noOfYearsToMature: this._noOfYearsToMature
    })

    this._editMode = false
  }

  get investmentType() {
    return this._investmentType
  }

  get compoundData() {
    return this._compoundData
  }

  set monthlyContribution(amount) {
    this._monthlyContribution = amount
    this._compoundData = calculateYearlyCompoundWithCharge({
      initialAmount: this._initialAmount,
      expectedReturn: this._expectedReturn,
      monthlyContribution: this._monthlyContribution,
      annualCharge: this._annualCharge,
      noOfYearsToMature: this._noOfYearsToMature
    })
  }

  get editMode() {
    return this._editMode
  }

  set editMode(bool) {
    this._editMode = bool
  }

  set noOfYearsToMature(years) {
    this._noOfYearsToMature = years
    this._compoundData = calculateYearlyCompoundWithCharge({
      initialAmount: this._initialAmount,
      expectedReturn: this._expectedReturn,
      monthlyContribution: this._monthlyContribution,
      annualCharge: this._annualCharge,
      noOfYearsToMature: this._noOfYearsToMature
    })
  }

  get monthlyContribution() {
    return this._monthlyContribution
  }

  get initialAmount() {
    return this._initialAmount
  }

  get expectedReturn() {
    return this._expectedReturn
  }

  get annualCharge() {
    return this._annualCharge
  }


}

