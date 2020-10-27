const variables = {
  CURRENCY_SYMBOL_FIELD: 'currencySymbol',
  START_AMOUNT_FIELD: 'startAmount',
  MAX_WALLET_FIELD: 'maxWalletAmount',
  MAX_BANK_FIELD: 'maxBankAmount',
  SET_CURRENCY_SYMBOL: {
    name: 'set-currency-symbol',
    description: 'Sets the symbol for the currency.',
    isArgsRequired: false,
    requiredArgsCount: 0,
    usage: '[symbol]',
    aliases: ['set-symbol', 'set-currency', 'currency'],
  },
  SET_START_AMOUNT: {
    name: 'set-start-amount',
    description: 'Sets the new user start amount.',
    isArgsRequired: false,
    requiredArgsCount: 0,
    usage: '[amount]',
    aliases: ['set-start-money', 'set-money', 'money'],
  },
  SET_MAX_WALLET: {
    name: 'set-max-wallet',
    description: 'Sets the max wallet amount. (Set to 0 to disable)',
    isArgsRequired: false,
    requiredArgsCount: 0,
    usage: '[amount]',
    aliases: ['max-wallet', 'wallet-max'],
  },
  SET_MAX_BANK: {
    name: 'set-max-bank',
    description: 'Sets the max bank amount. (Set to 0 to disable)',
    isArgsRequired: false,
    requiredArgsCount: 0,
    usage: '[amount]',
    aliases: ['max-bank', 'bank-max'],
  },
  PUBLISH_RULES: {
    name: 'publish-rules',
    description: 'Publish the rules.',
    isArgsRequired: false,
    requiredArgsCount: 0,
    usage: '',
    aliases: ['show-rules', 'make-rules'],
  },
};

// Export each individually.
Object.keys(variables).forEach(key => {
  module.exports[key] = variables[key];
});

module.exports = variables;
