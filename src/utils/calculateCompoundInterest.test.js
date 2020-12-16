/* globals describe it expect */
import { calculateYearlyCompoundWithCharge } from './calculateCompoundInterest';

describe('Compound Interest', () => {
  it('calculates without monthly contribution', () => {
    const investment = {
      initialAmount: 100,
      expectedReturn: 0.1,
      monthlyContribution: 0,
      noOfYearsToMature: 10,
      annualCharge: 0.00,
      name: 'sipp'
    };

    expect(calculateYearlyCompoundWithCharge(investment)['Year 10']['Month 12'].balance).toStrictEqual(270.71);
  });

  it('annual charges', () => {
    const investment = {
      initialAmount: 0,
      expectedReturn: 0.08,
      monthlyContribution: 5000,
      noOfYearsToMature: 3,
      annualCharge: 0.015,
      name: 'sipp'
    };

    expect(calculateYearlyCompoundWithCharge(investment)).toStrictEqual({
      'Year 1': {
        'Month 1': { balance: 5000, cumulativeInterest: 0, earnedInterest: 0 }, 'Month 10': { balance: 51526.97, cumulativeInterest: 1526.97, earnedInterest: 308.13 }, 'Month 11': { balance: 56870.48, cumulativeInterest: 1870.48, earnedInterest: 343.51 }, 'Month 12': { balance: 62249.62, cumulativeInterest: 2249.62, earnedInterest: 379.14 }, 'Month 2': { balance: 10033.33, cumulativeInterest: 33.33, earnedInterest: 33.33 }, 'Month 3': { balance: 15100.22, cumulativeInterest: 100.22, earnedInterest: 66.89 }, 'Month 4': { balance: 20200.89, cumulativeInterest: 200.89, earnedInterest: 100.67 }, 'Month 5': { balance: 25335.56, cumulativeInterest: 335.56, earnedInterest: 134.67 }, 'Month 6': { balance: 30504.46, cumulativeInterest: 504.46, earnedInterest: 168.9 }, 'Month 7': { balance: 35707.82, cumulativeInterest: 707.82, earnedInterest: 203.36 }, 'Month 8': { balance: 40945.87, cumulativeInterest: 945.87, earnedInterest: 238.05 }, 'Month 9': { balance: 46218.84, cumulativeInterest: 1218.84, earnedInterest: 272.97 }
      },
      'Year 2': {
        'Month 1': { balance: 66724.65, cumulativeInterest: 408.77, earnedInterest: 408.77 }, 'Month 10': { balance: 117055.42, cumulativeInterest: 5739.54, earnedInterest: 742.09 }, 'Month 11': { balance: 122835.79, cumulativeInterest: 6519.91, earnedInterest: 780.37 }, 'Month 12': { balance: 128654.7, cumulativeInterest: 7338.82, earnedInterest: 818.91 }, 'Month 2': { balance: 72169.48, cumulativeInterest: 853.6, earnedInterest: 444.83 }, 'Month 3': { balance: 77650.61, cumulativeInterest: 1334.73, earnedInterest: 481.13 }, 'Month 4': { balance: 83168.28, cumulativeInterest: 1852.4, earnedInterest: 517.67 }, 'Month 5': { balance: 88722.74, cumulativeInterest: 2406.86, earnedInterest: 554.46 }, 'Month 6': { balance: 94314.22, cumulativeInterest: 2998.34, earnedInterest: 591.48 }, 'Month 7': { balance: 99942.98, cumulativeInterest: 3627.1, earnedInterest: 628.76 }, 'Month 8': { balance: 105609.27, cumulativeInterest: 4293.39, earnedInterest: 666.29 }, 'Month 9': { balance: 111313.33, cumulativeInterest: 4997.45, earnedInterest: 704.06 }
      },
      'Year 3': {
        'Month 1': { balance: 132569.71, cumulativeInterest: 844.83, earnedInterest: 844.83 }, 'Month 10': { balance: 186958.2, cumulativeInterest: 10233.32, earnedInterest: 1205.02 }, 'Month 11': { balance: 193204.59, cumulativeInterest: 11479.71, earnedInterest: 1246.39 }, 'Month 12': { balance: 199492.62, cumulativeInterest: 12767.74, earnedInterest: 1288.03 }, 'Month 2': { balance: 138453.51, cumulativeInterest: 1728.63, earnedInterest: 883.8 }, 'Month 3': { balance: 144376.53, cumulativeInterest: 2651.65, earnedInterest: 923.02 }, 'Month 4': { balance: 150339.04, cumulativeInterest: 3614.16, earnedInterest: 962.51 }, 'Month 5': { balance: 156341.3, cumulativeInterest: 4616.42, earnedInterest: 1002.26 }, 'Month 6': { balance: 162383.58, cumulativeInterest: 5658.7, earnedInterest: 1042.28 }, 'Month 7': { balance: 168466.14, cumulativeInterest: 6741.26, earnedInterest: 1082.56 }, 'Month 8': { balance: 174589.25, cumulativeInterest: 7864.37, earnedInterest: 1123.11 }, 'Month 9': { balance: 180753.18, cumulativeInterest: 9028.3, earnedInterest: 1163.93 }
      }
    });
  });
});
