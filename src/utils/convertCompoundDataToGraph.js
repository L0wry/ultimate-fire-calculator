

export const convertCompoundDataToGraph = investments =>
  investments.reduce((accum, investment) => {
    for (const [year, months] of Object.entries(investment.compoundData)) {
      let isYearInAccum = accum.find(entry => entry.year === year)
      
      if (isYearInAccum) {
        isYearInAccum[investment.name] = months['Month 1'].balance
      } else {
        accum.push({
          year,
          [investment.name]: months['Month 1'].balance,
        })
      }
    }

    return accum
  }, [])

