const { MessageEmbed } = require('discord.js');

// Economy variables.
const { currencySymbol } = require('../config/economy.json');

// Constants.
const { MESSAGES_CONSTANTS, REGEX_CONSTANTS } = require('../constants');

// Helpers.
const WALLETS = require('./wallets');
const MAIN_HELPER = require('./MainHelper');
const UTILITY_HELPER = require('./UtilityHelper');

// Destruct constants.
const { USER_MENTION_REGEX } = REGEX_CONSTANTS;
const {
  AMOUNT_ERROR_MESSAGE,
  INSUFFICIENT_FUNDS_ERROR_MESSAGE,
  TRANSACTION_ERROR_TITLE,
  TRANSACTION_TITLE,
  TRANSACTION_MESSAGE,
  BALANCE_MESSAGE,
  NO_USER_MENTIONED_ERROR_MESSAGE,
} = MESSAGES_CONSTANTS;

module.exports = class TransactionHelper {
  constructor(amount, type) {
    this.error = false;
    this.amount = amount;
    this.transactionType = type;

    // The message sent back to the user.
    this.messageEmbed = new MessageEmbed()
      .setColor('RED')
      .setTitle(TRANSACTION_ERROR_TITLE);
  }

  validateAmount() {
    // Error if amount is undefined or not a number.
    const { amount } = this;
    if (!amount || Number.isNaN(amount) || amount <= 0) {
      this.messageEmbed.setDescription(AMOUNT_ERROR_MESSAGE);
      this.isError = true;
    }
  }

  validateSufficientBalance(balance) {
    // Error if the user doesn't have enough money.
    if (this.amount > balance) {
      this.messageEmbed.setDescription(
        INSUFFICIENT_FUNDS_ERROR_MESSAGE
          .replace('%balance%', balance),
      );

      this.isError = true;
    }
  }

  validateMention(mention) {
    // Error if no user was mentioned.
    if (!mention) {
      this.messageEmbed.setDescription(NO_USER_MENTIONED_ERROR_MESSAGE);
      this.isError = true;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getMessageTitle() {
    const pastTenseTransaction = UTILITY_HELPER
      .getPastTenseTransaction(this.transactionType);

    const capitalizedPastTransaction = UTILITY_HELPER
      .getCapitalizedString(pastTenseTransaction);

    return TRANSACTION_TITLE.replace('%transaction%', capitalizedPastTransaction);
  }

  getTransactionMessage(username, account) {
    const pastTenseTransaction = UTILITY_HELPER
      .getPastTenseTransaction(this.transactionType);

    const toFromText = UTILITY_HELPER.getToFromText(this.transactionType);

    return TRANSACTION_MESSAGE
      .replace('%transaction%', pastTenseTransaction)
      .replace('%symbol%', currencySymbol)
      .replace('%amount%', this.amount)
      .replace('%toFrom%', toFromText)
      .replace('%name%', `${username}'s`)
      .replace('%type%', account);
  }

  static getBalanceMessage(username, account, balance) {
    return BALANCE_MESSAGE
      .replace('%name%', username)
      .replace('%type%', account)
      .replace('%symbol%', currencySymbol)
      .replace('%balance%', balance);
  }

  buildMessage(username, account, balance) {
    const messageTitle = this.getMessageTitle();

    const transactionMessage = this.getTransactionMessage(username, account);

    const balanceMessage = TransactionHelper
      .getBalanceMessage(username, account, balance);

    this.messageEmbed
      .setColor('GREEN')
      .setTitle(messageTitle)
      .setDescription(`${transactionMessage}\n${balanceMessage}`);
  }

  /**
   * Title
   * 1. Capitalized past tense transaction type.
  */

  /**
   * Description
   * 1. Lowercase past tense transaction type.
   * 2. Transaction amount.
   *
   * 3. To/from text.
   *  If add, deposit, or transfer...
   *    - To/from text is 'to'.
   *  If remove or withdraw...
   *    - To/from text is 'from'.
   *
   * 4. Username.
   *  If add, remove, or transfer...
   *    - Username is mentioned user.
   *  If deposit or withdraw...
   *    - Username is author.
   *
   * 5. Account.
   *  If transfer or withdraw...
   *    - Account is wallet.
   *  If deposit...
   *    - Account is bank.
   *  If add or remove...
   *    - Account is args account.
  */

  /**
   * Balances
   * If add or remove...
   *  - Mentioned user's name and balance
   *
   * If deposit, withdraw, or transfer...
   *  - Author's name and balance.
  */
};
