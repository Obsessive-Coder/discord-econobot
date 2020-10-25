const variables = {
  CURRENCY_SYMBOL_MESSAGE: 'Currency symbol set to:',
  START_AMOUNT_MESSAGE: 'Start amount set to:',
  MAX_WALLET_MESSAGE: 'Max wallet amount set to:',
  MAX_BANK_MESSAGE: 'Max bank amount set to:',
  NAN_ERROR_MESSAGE: 'Amount must be a number',
  INVALID_ARGUMENT_ERROR_MESSAGE: 'Invalid or missing argument(s)',
  USAGE_ERROR_MESSAGE: 'The proper usage would be:',
  COOLDOWN_MESSAGE:
    'please wait %timeLeft% more second(s) before reusing the `%name%` command.',
  ALL_HELP_TITLE: 'Here\'s a list of all my commands:',
  ALL_HELP_DESCRIPTION:
    '\nYou can send `%prefix%help [command name]` to get info on a specific command!',
  INVALID_COMMAND_MESSAGE: 'That\'s not a valid command.',
  UNABLE_TO_DM_MESSAGE: 'it seems like I can\'t DM you! Do you have DMs disabled?',
  SUCCESS_HELP_MESSAGE: 'I\'ve sent you a DM with the requested command(s)',
  GET_BALANCE_ERROR_TITLE: 'Unknown User',
  GET_BALANCE_ERROR_MESSAGE: 'That user was not found. Please try again',
  GET_BALANCE_TITLE: 'User %accountType% Balance',
  GET_BALANCE_MESSAGE:
    '%username%\'s %accountType% balance is %currencySymbol%%balance%',
  TRANSFER_ERROR_TITLE: 'Transfer Error',
  AMOUNT_ERROR_MESSAGE: 'Amount must be a number greater than 0.',
  TRANSFER_INSUFFICIENT_FUNDS_ERROR_MESSAGE: 'Insufficient funds. You only have %balance%.',
  TRANSFER_TITLE: 'Transferred Money',
  TRANSFER_MESSAGE: 'Successfully transferred %currencySymbol%%amount% to %username%.',
  ADD_MONEY_TITLE: 'Added Money',
  ADD_MONEY_MESSAGE: 'Successfully added %symbol%%amount% to %name%\'s %type% balance',
  NO_USER_MENTIONED_ERROR_MESSAGE: 'No user was mentioned.',
  LEADERBOARD_TITLE: '%type% Funds Leaderboard',
  UNKNOWN_COMMAND_ERROR_MESSAGE: '`%prefix%%command%` is an unknown command.',
  DB_SYNC_ERROR_MESSAGE: 'Something went wrong with syncing the database.',
};

// Export each individually.
Object.keys(variables).forEach(key => {
  module.exports[key] = variables[key];
});

module.exports = variables;
