export const AccountType = {
  ADVANCED: 'ADVANCED',
  MANUAL: 'MANUAL',
} as const;

export type AccountType = (typeof AccountType)[keyof typeof AccountType];

