import { all, create } from 'mathjs'

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

const MONTHS_OF_THE_YEAR = 12
const ROUND_AMOUNT = 2

export const calculateYearlyCompoundWithCharge = ({
  initialAmount = 0, 
  expectedReturn = 0, 
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
    ? math.round(math.subtract(totalAmountAfterMaturing, math.multiply(totalAmountAfterMaturing, annualCharge)), ROUND_AMOUNT)
    : totalAmountAfterMaturing
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
    const earnedInterest = math.chain(balance).multiply(expectedReturn).divide(MONTHS_OF_THE_YEAR).round(ROUND_AMOUNT).done()
    cumulativeInterest = math.round(math.add(cumulativeInterest, earnedInterest), ROUND_AMOUNT)

    balance =  math.chain(balance).add(monthlyContribution).add(earnedInterest).round(ROUND_AMOUNT).done()
    
    compoundInterest[`Month ${i}`] = {
      earnedInterest,
      balance,
      cumulativeInterest
    }
  }

  return compoundInterest
}
