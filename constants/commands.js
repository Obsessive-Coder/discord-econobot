// Fields.
const CURRENCY_SYMBOL_FIELD = 'currencySymbol';
const START_AMOUNT_FIELD = 'startAmount';

const SET_CURRENCY_SYMBOL = {
  name: 'set-currency-symbol',
  description: 'Sets the symbol for the currency.',
};

const SET_START_AMOUNT = {
  name: 'set-start-amount',
  description: 'Sets the new user start amount.',
};

module.exports.CURRENCY_SYMBOL_FIELD = CURRENCY_SYMBOL_FIELD;
module.exports.START_AMOUNT_FIELD = START_AMOUNT_FIELD;
module.exports.SET_CURRENCY_SYMBOL = SET_CURRENCY_SYMBOL;
module.exports.SET_START_AMOUNT = SET_START_AMOUNT;

module.exports = {
  CURRENCY_SYMBOL_FIELD,
  START_AMOUNT_FIELD,
  SET_CURRENCY_SYMBOL,
  SET_START_AMOUNT,
};
