

export const convertCompoundDataToGraph = (investments, dataKey = 'balance') => investments?.reduce((accum, investment) => {
  for (const [year, months] of Object.entries(investment.compoundData)) {
    const isYearInAccum = accum.find((entry) => entry.year === year);

    if (isYearInAccum) {
      isYearInAccum[investment.investmentName] = months['Month 12'][dataKey];
    } else {
      accum.push({
        year,
        [investment.investmentName]: months['Month 12'][dataKey],
      });
    }
  }

  return accum;
}, []);
