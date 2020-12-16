import { all, create } from 'mathjs';

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

export const convertInvestmentDataToFire = (investments, safeWithdrawalPercent, expenseTotal) => investments.reduce((accum, investment,) => {
  for (const [year, months] of Object.entries(investment.compoundData)) {
    const isYearInAccum = accum.find((entry) => entry.year === year);
    const incomeToAdd = math.chain(months['Month 12'].balance).multiply(safeWithdrawalPercent).divide(12).round(2)
      .done();

    if (isYearInAccum) {
      isYearInAccum['Income From Draw Down'] = math.round(math.add(isYearInAccum['Income From Draw Down'], incomeToAdd), 2);
    } else {
      accum.push({
        year,
        Expenses: expenseTotal,
        'Income From Draw Down': math.round(incomeToAdd, 2)
      });
    }
  }

  return accum;
}, []);
