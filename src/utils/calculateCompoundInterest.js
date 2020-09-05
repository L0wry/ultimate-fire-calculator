import { all, create } from 'mathjs'

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});


export const calculateCompoundInterest = (
  {initialAmount, 
  expectedReturn, 
  monthlyContribution,  
  noOfYears }) => {

    const compoundInterest = {}

  let balance = initialAmount
  let  cumulativeInterest = 0;
  
  // forgive for starting at 1 plz god. Makes years easier
  for (let i = 1; i <= math.multiply(noOfYears, 12); i++ ) {  
    const earnedInterest = math.round(math.divide(math.multiply( balance, expectedReturn), 12), 2)
    cumulativeInterest = math.add(cumulativeInterest, earnedInterest)

    balance =  math.chain(balance).add(monthlyContribution).add(earnedInterest).round(2).done()
    
    compoundInterest[`month-${i}`] = {
      earnedInterest,
      balance,
      cumulativeInterest
    }
  }

  return compoundInterest
}
