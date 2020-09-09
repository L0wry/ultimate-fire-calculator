import { all, create } from 'mathjs'

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

const MONTHS_OF_THE_YEAR = 12

export const calculateYearlyCompoundWithCharge = ({
  initialAmount = 0, 
  expectedReturn= 0, 
  monthlyContribution = 0,
  annualCharge = 0,
  noOfYearsToMature = 0
}) => {

  const compoundInterest = {}
  let totalAmount = initialAmount;

  // forgive for starting at 1 plz god. Makes years easier
  for (let i = 1; i <= noOfYearsToMature; i++ ) {  
    compoundInterest[`Year ${i}`] = calculateMonthlyCompoundInterest({
      totalAmount, 
      expectedReturn, 
      monthlyContribution
    })

    const totalAmountAfterMaturing = compoundInterest[`Year ${i}`][`Month ${MONTHS_OF_THE_YEAR}`].balance
    
    totalAmount = annualCharge
    ? math.round(math.subtract(totalAmountAfterMaturing, math.multiply(totalAmountAfterMaturing, annualCharge)), 2)
    : totalAmountAfterMaturing
    
      console.log('amount before charge', totalAmountAfterMaturing)
      console.log('charge amount', math.multiply(totalAmountAfterMaturing, annualCharge))
      console.log('new total amount', math.round(math.subtract(totalAmountAfterMaturing, math.multiply(totalAmountAfterMaturing, annualCharge)), 2))
  }

  return compoundInterest
}

export const calculateMonthlyCompoundInterest = ({
    totalAmount, 
    expectedReturn, 
    monthlyContribution,
  }) => {
  const compoundInterest = {}

  let balance = totalAmount
  let  cumulativeInterest = 0;
  
  // forgive for starting at 1 plz god. Makes years easier
  for (let i = 1; i <= MONTHS_OF_THE_YEAR; i++ ) {  
    const earnedInterest = math.round(math.divide(math.multiply( balance, expectedReturn), MONTHS_OF_THE_YEAR), 2)
    cumulativeInterest = math.round(math.add(cumulativeInterest, earnedInterest), 2)

    balance =  math.chain(balance).add(monthlyContribution).add(earnedInterest).round(2).done()
    
    compoundInterest[`Month ${i}`] = {
      earnedInterest,
      balance,
      cumulativeInterest
    }
  }

  return compoundInterest
}
