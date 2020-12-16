export const INVESTMENT_TYPES = {
  PENSION: 'Pension',
  ISA: 'Isa',
  LISA: 'Lisa',
  GENERAL: 'General',
  OTHER: 'Other'
};

export default {
  [INVESTMENT_TYPES.PENSION]: {
    annualAllowance: 40000,
    lifeTimeAllowance: 1073100
  },
  [INVESTMENT_TYPES.ISA]: {
    annualAllowance: 20000,
  },
  [INVESTMENT_TYPES.LISA]: {
    annualAllowance: 4000,
  },
  [INVESTMENT_TYPES.GENERAL]: {
    annualAllowance: 9999999999999,
  },
  [INVESTMENT_TYPES.OTHER]: {
    annualAllowance: 9999999999999,
  }
};
