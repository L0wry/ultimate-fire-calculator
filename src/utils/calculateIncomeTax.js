import { all, create } from 'mathjs';

import { TAX_BANDS } from 'src/consts/';

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

const ROUND_AMOUNT = 2;

export const calculateIncomeTax = (tax, taxableIncome) => {
  let carryOver = taxableIncome;

  for (const band of TAX_BANDS) {
    const taxableAmount = math.subtract(tax[band].end, tax[band].start);

    if (math.subtract(carryOver, taxableAmount) > 0) {
      tax[band].taxPaid = math.round(math.multiply(taxableAmount, tax[band].taxPercent), ROUND_AMOUNT);
      tax.totalIncomeTax = math.add(tax.totalIncomeTax, tax[band].taxPaid);
      tax[band].carryOver = math.subtract(carryOver, taxableAmount);
      carryOver = math.subtract(carryOver, taxableAmount);

    } else {
      tax[band].taxPaid = math.multiply(carryOver, tax[band].taxPercent) > 0
        ? math.round(math.multiply(carryOver, tax[band].taxPercent), ROUND_AMOUNT)
        : 0;

      tax.totalIncomeTax = math.round(math.add(tax.totalIncomeTax, tax[band].taxPaid), ROUND_AMOUNT);
      carryOver = 0;
      break;
    }
  }

  return tax;
};
