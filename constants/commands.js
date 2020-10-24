const HELP = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  isArgsRequired: false,
  requiredArgsCount: 0,
  usage: '[command name]',
};

const ADD_MONEY = {
  name: 'add-money',
  description: 'Add money to a user.',
  isArgsRequired: true,
  requiredArgsCount: 2,
  usage: '[wallet | bank] <member> <amount>',
  aliases: ['add-funds'],
};

const GET_BALANCE = {
  name: 'get-balance',
  description: 'Get a user\'s wallet or bank balance.',
  isArgsRequired: false,
  requiredArgsCount: 0,
  usage: '[wallet | bank] [member]',
  aliases: ['get-money', 'get-funds'],
};

module.children.HELP = HELP;
module.exports.ADD_MONEY = ADD_MONEY;
module.exports.GET_BALANCE = GET_BALANCE;

module.exports = {
  HELP,
  ADD_MONEY,
  GET_BALANCE,
};
