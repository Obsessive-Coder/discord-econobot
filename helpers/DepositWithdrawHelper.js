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
} = MESSAGES_CONSTANTS;

module.exports = class DepositWithdrawHelper {
  static makeTransaction(message, args, transactionType) {
    const {
      username,
      id: authorId,
    } = message.author;

    const isDeposit = transactionType === 'deposit';
    const fromAccount = isDeposit ? 'wallet' : 'bank';
    const fromBalance = WALLETS.getBalance(authorId, fromAccount);
    const isAll = args.includes('all');
    const amount = isAll
      ? fromBalance : UTILITY_HELPER.getArgsAmount(args);

    const messageEmbed = new MessageEmbed()
      .setColor('RED')
      .setTitle(TRANSACTION_ERROR_TITLE);

    let isError = false;

    // Error if amount is undefined or not a number.
    if (!amount || Number.isNaN(amount) || amount <= 0) {
      messageEmbed.setDescription(AMOUNT_ERROR_MESSAGE);
      isError = true;
    }

    // Error if the user doesn't have enough money.
    if (!isError && amount > fromBalance) {
      messageEmbed.setDescription(
        INSUFFICIENT_FUNDS_ERROR_MESSAGE
          .replace('%balance%', fromBalance),
      );

      isError = true;
    }

    // Make the transaction.
    if (!isError) {
      const toAccount = isDeposit ? 'bank' : 'wallet';

      WALLETS.add(authorId, -amount, fromAccount);
      WALLETS.add(authorId, amount, toAccount);

      const newWalletBalance = WALLETS.getBalance(authorId, 'wallet');
      const newBankBalance = WALLETS.getBalance(authorId, 'bank');

      const pastTransaction = isDeposit ? 'deposited' : 'withdrew';
      const toFromText = isDeposit ? 'to' : 'from';

      const transactionMessage = TRANSACTION_MESSAGE
        .replace('%transaction%', pastTransaction)
        .replace('%symbol%', currencySymbol)
        .replace('%amount%', amount)
        .replace('%toFrom%', toFromText)
        .replace('%name%', 'your')
        .replace('%type%', 'bank');

      const walletBalanceMessage = BALANCE_MESSAGE
        .replace('%name%', username)
        .replace('%type%', 'wallet')
        .replace('%symbol%', currencySymbol)
        .replace('%balance%', newWalletBalance);

      const bankBalanceMessage = BALANCE_MESSAGE
        .replace('%name%', username)
        .replace('%type%', 'bank')
        .replace('%symbol%', currencySymbol)
        .replace('%balance%', newBankBalance);

      const capitalizedPastTransaction = UTILITY_HELPER
        .getCapitalizedString(pastTransaction);

      const title = TRANSACTION_TITLE
        .replace('%transaction%', capitalizedPastTransaction);

      messageEmbed
        .setColor('GREEN')
        .setTitle(title)
        .setDescription(
          `${transactionMessage}\n${walletBalanceMessage}\n${bankBalanceMessage}`,
        );
    }

    message.channel.send(messageEmbed);
  }
};
