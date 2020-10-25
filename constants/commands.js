const variables = {
  HELP: {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    isArgsRequired: false,
    requiredArgsCount: 0,
    usage: '[command name]',
  },
  ADD_MONEY: {
    name: 'add-money',
    description: 'Add money to a user.',
    isArgsRequired: true,
    requiredArgsCount: 2,
    usage: '[wallet | bank] <member> <amount>',
    aliases: ['add-funds'],
  },
  TRANSFER_MONEY: {
    name: 'transfer-money',
    description: 'Transfer money to another user.',
    isArgsRequired: true,
    requiredArgsCount: 1,
    usage: '[wallet | bank] <member>',
    aliases: ['transfer', 'transfer-funds'],
  },
  GET_BALANCE: {
    name: 'get-balance',
    description: 'Get a user\'s wallet or bank balance.',
    isArgsRequired: false,
    requiredArgsCount: 0,
    usage: '[wallet | bank] [member]',
    aliases: ['get-money', 'get-funds'],
  },
};

// Export each individually.
Object.keys(variables).forEach(key => {
  module.exports[key] = variables[key];
});

module.exports = variables;
