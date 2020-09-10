

export const convertCompoundDataToGraph = investments =>
  investments.reduce((accum, investment) => {
    for (const [year, months] of Object.entries(investment.compoundData)) {
      let isYearInAccum = accum.find(entry => entry.Time === year)
      
      if (isYearInAccum) {
        isYearInAccum[investment.name] = months['Month 1'].balance
      } else {
        accum.push({
          Time: year,
          [investment.name]: months['Month 1'].balance,
        })
      }
    }

    return accum
  }, [])

