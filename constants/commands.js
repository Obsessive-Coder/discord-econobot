// Fields.
const CURRENCY_SYMBOL_FIELD = 'currencySymbol';
const START_AMOUNT_FIELD = 'startAmount';
const MAX_POCKET_FIELD = 'maxPocketAmount';
const MAX_BANK_FIELD = 'maxBankAmount';

const SET_CURRENCY_SYMBOL = {
  name: 'set-currency-symbol',
  description: 'Sets the symbol for the currency.',
};

const SET_START_AMOUNT = {
  name: 'set-start-amount',
  description: 'Sets the new user start amount.',
};

const SET_MAX_POCKET = {
  name: 'set-max-pocket',
  description: 'Sets the max pocket amount. (Set to 0 to disable)',
};

const SET_MAX_BANK = {
  name: 'set-max-bank',
  description: 'Sets the max bank amount. (Set to 0 to disable)',
};

module.exports.CURRENCY_SYMBOL_FIELD = CURRENCY_SYMBOL_FIELD;
module.exports.START_AMOUNT_FIELD = START_AMOUNT_FIELD;
module.exports.MAX_POCKET_FIELD = MAX_POCKET_FIELD;
module.exports.MAX_BANK_FIELD = MAX_BANK_FIELD;
module.exports.SET_CURRENCY_SYMBOL = SET_CURRENCY_SYMBOL;
module.exports.SET_START_AMOUNT = SET_START_AMOUNT;
module.exports.SET_MAX_POCKET = SET_MAX_POCKET;
module.exports.SET_MAX_BANK = SET_MAX_BANK;

module.exports = {
  CURRENCY_SYMBOL_FIELD,
  START_AMOUNT_FIELD,
  MAX_POCKET_FIELD,
  MAX_BANK_FIELD,
  SET_CURRENCY_SYMBOL,
  SET_START_AMOUNT,
  SET_MAX_POCKET,
  SET_MAX_BANK,
};
