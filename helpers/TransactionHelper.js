const { MessageEmbed } = require('discord.js');
const tensify = require('tensify');

// Economy variables.
const { currencySymbol } = require('../config/economy.json');

// Constants.
const { MESSAGES_CONSTANTS, REGEX_CONSTANTS } = require('../constants');

// Helpers.
const MAIN_HELPER = require('./MainHelper');
const UTILITY_HELPER = require('./UtilityHelper');
const WALLETS = require('./wallets');

// Destruct constants.
const { USER_MENTION_REGEX } = REGEX_CONSTANTS;
const {
  TRANSACTION_ERROR_TITLE,
  TRANSACTION_TITLE,
  TRANSACTION_MESSAGE,
  BALANCE_MESSAGE,
  AMOUNT_ERROR_MESSAGE,
  NO_USER_MENTIONED_ERROR_MESSAGE,
} = MESSAGES_CONSTANTS;

module.exports = class TransactionHelper {
  static makeTransaction(message, args, transactionType) {
    const userMention = args.find(arg => USER_MENTION_REGEX.test(arg));
    const amount = UTILITY_HELPER.getArgsAmount(args);

    const messageEmbed = new MessageEmbed()
      .setColor('RED')
      .setTitle(TRANSACTION_ERROR_TITLE);

    let isError = false;

    // Error if amount is undefined or not a number.
    if (!amount || Number.isNaN(amount) || amount <= 0) {
      messageEmbed.setDescription(AMOUNT_ERROR_MESSAGE);
      isError = true;
    }

    // Error if no user was mentioned.
    if (!isError && !userMention) {
      messageEmbed.setDescription(NO_USER_MENTIONED_ERROR_MESSAGE);
      isError = true;
    }

    if (!isError) {
      const { client } = message;
      const accountType = UTILITY_HELPER.getArgsAccountType(args);

      const {
        username,
        id: recipientId,
      } = MAIN_HELPER.getUserFromMention(userMention, client);

      const transactionAmount = transactionType === 'remove' ? -amount : amount;

      WALLETS.add(recipientId, transactionAmount, accountType);

      const newBalance = WALLETS.getBalance(recipientId, accountType);

      const pastTransaction = tensify(transactionType).past_participle;
      const toFromText = transactionType === 'remove' ? 'from' : 'to';

      const transactionMessage = TRANSACTION_MESSAGE
        .replace('%transaction%', pastTransaction)
        .replace('%symbol%', currencySymbol)
        .replace('%amount%', amount)
        .replace('%toFrom%', toFromText)
        .replace('%name%', username)
        .replace('%type%', accountType);

      const balanceMessage = BALANCE_MESSAGE
        .replace('%name%', username)
        .replace('%type%', accountType)
        .replace('%symbol%', currencySymbol)
        .replace('%balance%', newBalance);

      const capitalizedPastTransaction = UTILITY_HELPER
        .getCapitalizedString(pastTransaction);

      const title = TRANSACTION_TITLE
        .replace('%transaction%', capitalizedPastTransaction);

      messageEmbed
        .setColor('GREEN')
        .setTitle(title)
        .setDescription(
          `${transactionMessage}\n${balanceMessage}`,
        );
    }

    message.channel.send(messageEmbed);
  }
};
