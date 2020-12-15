

export const convertCompoundDataToGraph = investments =>
  investments.reduce((accum, investment) => {
    for (const [year, months] of Object.entries(investment.compoundData)) {
      let isYearInAccum = accum.find(entry => entry.year === year)
      
      if (isYearInAccum) {
        isYearInAccum[investment.investmentName] = months['Month 12'].balance
      } else {
        accum.push({
          year,
          [investment.investmentName]: months['Month 12'].balance,
        })
      }
    }

    return accum
  }, [])

