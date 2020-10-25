const variables = {
  HELP: {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    isArgsRequired: false,
    requiredArgsCount: 0,
    usage: '[command name]',
  },
  SHOW_LEADERBOARD: {
    name: 'show-leaderboard',
    description: 'Show the top 10 users.',
    isArgsRequired: false,
    requiredArgsCount: 0,
    usage: '[wallet | bank | total]',
    aliases: ['leaderboard', 'leaders', 'show-leaders'],
  },
  GET_BALANCE: {
    name: 'get-balance',
    description: 'Get a user\'s wallet or bank balance.',
    isArgsRequired: false,
    requiredArgsCount: 0,
    usage: '[wallet | bank] [member]',
    aliases: ['get-money', 'get-funds'],
  },
  ADD_MONEY: {
    name: 'add-money',
    description: 'Add money to a user\'s balance.',
    isArgsRequired: true,
    requiredArgsCount: 2,
    usage: '[wallet | bank] <member> <amount>',
    aliases: ['add', 'add-funds'],
  },
  REMOVE_MONEY: {
    name: 'remove-money',
    description: 'Remove money from a user\'s balance.',
    isArgsRequired: true,
    requiredArgsCount: 2,
    usage: '[wallet | bank] <member> <amount>',
    aliases: ['remove', 'remove-funds'],
  },
  DEPOSIT_MONEY: {
    name: 'deposit-money',
    description: 'Deposit money in your bank.',
    isArgsRequired: true,
    requiredArgsCount: 1,
    usage: '<amount | all>',
    aliases: ['deposit', 'deposit-funds'],
  },
  WITHDRAW_MONEY: {
    name: 'withdraw-money',
    description: 'Withdraw money from your bank.',
    isArgsRequired: true,
    requiredArgsCount: 1,
    usage: '<amount | all>',
    aliases: ['withdraw', 'withdraw-funds'],
  },
  TRANSFER_MONEY: {
    name: 'transfer-money',
    description: 'Transfer money to another user.',
    isArgsRequired: true,
    requiredArgsCount: 2,
    usage: '[wallet | bank] <member> <amount | all>',
    aliases: ['transfer', 'transfer-funds'],
  },
};

// Export each individually.
Object.keys(variables).forEach(key => {
  module.exports[key] = variables[key];
});

module.exports = variables;
