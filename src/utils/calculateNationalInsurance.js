import { all, create } from 'mathjs';

const BANDS = ['lowerBand', 'mediumBand', 'upperBand'];

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

const WEEKS_IN_YEAR = 52;
const ROUND_AMOUNT = 2;

export const calculateNationalInsurance = (tax, taxableIncome) => {
  tax.weeklyNationalInsuranceTax = 0;
  tax.totalNationalInsuranceTax = 0;
  const weeklyIncome = math.divide(taxableIncome, WEEKS_IN_YEAR);

  let carryOver = weeklyIncome;

  for (const band of BANDS) {
    const difference = math.subtract(tax[band].end, tax[band].start);
    if (math.subtract(carryOver, difference) > 0) {
      tax[band].taxPaid = math.round(math.multiply(difference, tax[band].taxPercent), ROUND_AMOUNT);
      tax.weeklyNationalInsuranceTax = math.add(tax.weeklyNationalInsuranceTax, tax[band].taxPaid);

      tax[band].carryOver = math.subtract(carryOver, difference);
      carryOver = math.subtract(carryOver, difference);
    } else {
      tax[band].taxPaid = math.multiply(carryOver, tax[band].taxPercent) > 0
        ? math.round(math.multiply(carryOver, tax[band].taxPercent), ROUND_AMOUNT)
        : 0;

      tax.weeklyNationalInsuranceTax = math.round(math.add(tax.weeklyNationalInsuranceTax, tax[band].taxPaid), ROUND_AMOUNT);

      carryOver = 0;
      break;
    }
  }

  BANDS.forEach((band) => {
    tax[band].taxPaid = math.round(math.multiply(tax[band].taxPaid, WEEKS_IN_YEAR), ROUND_AMOUNT);
  });

  tax.totalNationalInsuranceTax = math.round(math.multiply(tax.weeklyNationalInsuranceTax, WEEKS_IN_YEAR), ROUND_AMOUNT);
  return tax;
};
