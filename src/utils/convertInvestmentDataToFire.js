import { all, create } from 'mathjs';
import calculateAllTax from './calculateAllTax';
import { INVESTMENT_TYPES } from '../investments/investmentMetaData';

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

export const convertInvestmentDataToFire = (investments, safeWithdrawalPercent, allExpenses) => investments.reduce((accum, investment) => {
  for (const [year, months] of Object.entries(investment.compoundData)) {
    const isYearInAccum = accum.find((entry) => entry.year === year);

    let incomeToAdd

    if (investment.investmentType === INVESTMENT_TYPES.ISA ||
      investment.investmentType === INVESTMENT_TYPES.LISA ||
      investment.investmentType === INVESTMENT_TYPES.PENSION) {

      incomeToAdd = math.chain(months['Month 12'].balance).multiply(safeWithdrawalPercent).divide(12).round(2)
        .done();
    } else {
      const incomeTax = calculateAllTax({ salary: math.chain(months['Month 12'].balance).multiply(safeWithdrawalPercent).round(2).done() })
      incomeToAdd = math.round(math.divide(incomeTax.totalTakeHome, 12), 2)
    }

    if (isYearInAccum) {

      isYearInAccum['Income From Draw Down'] = math.round(math.add(isYearInAccum['Income From Draw Down'], incomeToAdd), 2);
    } else {
      const debtCostsForYear = allExpenses?.debts?.reduce((accum, debt) => parseInt(year.split(' ')[1]) <= debt.yearsLeftToPay ? debt.monthlyPayments + accum : accum, 0)
      const expensesCostForYear = allExpenses?.expenses?.reduce((a, b) => a + b.cost, 0)
      accum.push({
        year,
        Expenses: math.round(debtCostsForYear + expensesCostForYear, 2),
        'Income From Draw Down': math.round(incomeToAdd, 2)
      });
    }
  }

  return accum;
}, [])
