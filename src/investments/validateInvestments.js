import { all, create } from 'mathjs';
import investmentMetaData, { INVESTMENT_TYPES } from './investmentMetaData';

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});


function validateAnnualAllowance(investments) {
  const validatedInvestments = [];

  for (const [investmentType, metaData] of Object.entries(investmentMetaData)) {

    const filteredInvestments = investments.filter((investment) => investment?.investmentType === investmentType);


    if (metaData.annualAllowance) {
      const filteredInvestmentsTotal = math.multiply(filteredInvestments.reduce((a, b) => a + b.monthlyContribution, 0), 12);

      if (filteredInvestmentsTotal > metaData.annualAllowance) {
        validatedInvestments.push(...filteredInvestments.map((investment) => {
          investment.isOverAnnualAllowance = true;
          return investment;
        }));
      } else {
        validatedInvestments.push(...filteredInvestments.map((investment) => {
          investment.isOverAnnualAllowance = false;
          return investment;
        }));
      }

    } else {
      validatedInvestments.push(...filteredInvestments.map((investment) => {
        investment.isOverAnnualAllowance = false;
        return investment;
      }));
    }
  }
  return validatedInvestments;

}

function validateLifetimeAllowance(investments) {
  const validatedInvestments = [];

  const filteredInvestments = investments.filter((investment) => investment?.investmentType === INVESTMENT_TYPES.PENSION)

  const totalPensionTotal = filteredInvestments.reduce((a, b) => a + b.compoundData[`Year ${b.noOfYearsToMature}`]['Month 12'].balance, 0)

  if (totalPensionTotal > investmentMetaData[INVESTMENT_TYPES.PENSION].lifeTimeAllowance) {
    validatedInvestments.push(...filteredInvestments.map((investment) => {
      investment.isOverLifetimeAllowance = true;
      investment.overLifetimeAllowanceBy = math.round(math.subtract(totalPensionTotal, investmentMetaData[INVESTMENT_TYPES.PENSION].lifeTimeAllowance), 2)
      return investment;
    }));

  } else {
    validatedInvestments.push(...filteredInvestments);
  }

  validatedInvestments.push(...investments.filter((investment) => investment?.investmentType !== INVESTMENT_TYPES.PENSION))
  return validatedInvestments
}

export function validateInvestments(investments) {
  const validated = validateAnnualAllowance(investments)
  return validateLifetimeAllowance(validated)
}


