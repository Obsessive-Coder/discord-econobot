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
  BALANCE_MESSAGE: '%name%\'s %type% balance is %symbol%%balance%',
  LEADERBOARD_TITLE: '%type% Funds Leaderboard',
  UNKNOWN_COMMAND_ERROR_MESSAGE: '`%prefix%%command%` is an unknown command.',
  DB_SYNC_ERROR_MESSAGE: 'Something went wrong with syncing the database.',

  TRANSACTION_ERROR_TITLE: 'Transaction Error',
  TRANSACTION_TITLE: '%transaction% Money',
  TRANSACTION_MESSAGE:
    'Successfully %transaction% %symbol%%amount% %toFrom% %name% %type% balance.',

  TRANSFER_ERROR_TITLE: 'Transfer Error',
  TRANSFER_TITLE: 'Transferred Money',
  TRANSFER_MESSAGE: 'Successfully transferred %currencySymbol%%amount% to %username%.',

  DEPOSIT_ERROR_TITLE: 'Deposit Error',
  DEPOSIT_TITLE: 'Deposited Money',
  DEPOSIT_MESSAGE: 'Successfully deposited %symbol%%amount% into your bank.',

  WITHDRAW_ERROR_TITLE: 'Withdraw Error',
  WITHDRAW_TITLE: 'Withdrew Money',
  WITHDRAW_MESSAGE: 'Successfully withdrew %symbol%%amount% from your bank.',

  INSUFFICIENT_FUNDS_ERROR_MESSAGE: 'Insufficient funds. You only have %balance%.',
  AMOUNT_ERROR_MESSAGE: 'Amount must be a number greater than 0.',
  NO_USER_MENTIONED_ERROR_MESSAGE: 'No user was mentioned.',
};

// Export each individually.
Object.keys(variables).forEach(key => {
  module.exports[key] = variables[key];
});

module.exports = variables;
