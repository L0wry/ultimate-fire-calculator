export const INVESTMENT_TYPES = {
  PENSION: 'pension',
  ISA: 'isa',
  LISA: 'lisa',
  GENERAL: 'general'
}

export default {
  [INVESTMENT_TYPES.PENSION]:  {
    annualAllowance: 40000,
  },
  [INVESTMENT_TYPES.ISA]: {
    annualAllowance: 20000,
  },
  [INVESTMENT_TYPES.LISA]: {
    annualAllowance: 4000,
  },
  [INVESTMENT_TYPES.GENERAL]: {
    annualAllowance: 9999999999999,
  }
}
