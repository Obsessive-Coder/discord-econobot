const { MessageEmbed } = require('discord.js');

// Economy variables.
const { currencySymbol } = require('../config/economy.json');

// Constants.
const { MESSAGES_CONSTANTS } = require('../constants');

// Helpers.
const WALLETS = require('./wallets');
const UTILITY_HELPER = require('./UtilityHelper');

// Destruct constants.
const {
  AMOUNT_ERROR_MESSAGE,
  INSUFFICIENT_FUNDS_ERROR_MESSAGE,
  TRANSACTION_ERROR_TITLE,
  TRANSACTION_TITLE,
  TRANSACTION_MESSAGE,
  BALANCE_MESSAGE,
  NO_USER_MENTIONED_ERROR_MESSAGE,
  INVALID_ROLE_MESSAGE,
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

  validateRole(roles, roleName) {
    const isUserRole = roles.cache.some(role => role.name === roleName);

    if (!isUserRole) {
      const description = INVALID_ROLE_MESSAGE.replace('%role%', roleName);
      this.messageEmbed.setDescription(description);
      this.isError = true;
    }
  }

  validateAmount() {
    // Error if amount is undefined or not a number.
    const { amount } = this;
    if (!amount || Number.isNaN(amount) || amount <= 0) {
      this.messageEmbed.setDescription(AMOUNT_ERROR_MESSAGE);
      this.isError = true;
    }
  }

  validateSufficientBalance(balance, account) {
    // Error if the user doesn't have enough money.
    if (this.amount > balance) {
      this.messageEmbed.setDescription(
        INSUFFICIENT_FUNDS_ERROR_MESSAGE
          .replace('%balance%', balance)
          .replace('%account%', account),
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

  getMessages(userId, username, account) {
    const transactionMessage = this.getTransactionMessage(username, account);

    const walletBalance = WALLETS.getBalance(userId, 'wallet');
    const bankBalance = WALLETS.getBalance(userId, 'bank');

    const walletBalanceMessage = TransactionHelper
      .getBalanceMessage(username, 'wallet', walletBalance);

    const bankBalanceMessage = TransactionHelper
      .getBalanceMessage(username, 'bank', bankBalance);

    return [transactionMessage, walletBalanceMessage, bankBalanceMessage];
  }

  static getBalanceMessage(username, account, balance) {
    return BALANCE_MESSAGE
      .replace('%name%', username)
      .replace('%type%', account)
      .replace('%symbol%', currencySymbol)
      .replace('%balance%', balance);
  }

  buildMessage(userId, username, account) {
    const messageTitle = this.getMessageTitle();
    const messages = this.getMessages(userId, username, account);

    this.messageEmbed
      .setColor('GREEN')
      .setTitle(messageTitle)
      .setDescription(messages.join('\n'));
  }
};
