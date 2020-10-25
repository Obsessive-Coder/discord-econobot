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
  static makeTransaction(message, args, transactionType) {
    const {
      client,
      author: {
        username,
        id: authorId,
      },
    } = message;

    const category = UTILITY_HELPER
      .getTransactionCategory(transactionType);

    let fromBalance = 0;
    let fromAccount = 'wallet';
    let toAccount = 'wallet';
    let amount = UTILITY_HELPER.getArgsAmount(args);
    const userMention = args.find(arg => USER_MENTION_REGEX.test(arg));

    const isDeposit = transactionType === 'deposit';
    const isAddRemove = category === 'addRemove';
    const isDepositWithdraw = category === 'depositWithdraw';
    const isTransfer = category === 'transfer';

    if (isDepositWithdraw || isTransfer) {
      fromAccount = isDeposit ? 'wallet' : 'bank';
      toAccount = isDeposit ? 'bank' : 'wallet';

      const isAll = args.includes('all');
      amount = isAll ? fromBalance : UTILITY_HELPER.getArgsAmount(args);
    }

    if (isAddRemove || isTransfer) {
      fromAccount = UTILITY_HELPER.getArgsAccountType(args);
    }

    if (isTransfer) {
      toAccount = 'wallet';
    }

    fromBalance = WALLETS.getBalance(authorId, fromAccount);

    const messageEmbed = new MessageEmbed()
      .setColor('RED')
      .setTitle(TRANSACTION_ERROR_TITLE);

    let isError = false;

    // Error if amount is undefined or not a number.
    if (!amount || Number.isNaN(amount) || amount <= 0) {
      messageEmbed.setDescription(AMOUNT_ERROR_MESSAGE);
      isError = true;
    }

    if (isDepositWithdraw || isTransfer) {
      // Error if the user doesn't have enough money.
      if (!isError && amount > fromBalance) {
        messageEmbed.setDescription(
          INSUFFICIENT_FUNDS_ERROR_MESSAGE
            .replace('%balance%', fromBalance),
        );

        isError = true;
      }
    }

    if (isAddRemove || isTransfer) {
      // Error if no user was mentioned.
      if (!isError && !userMention) {
        messageEmbed.setDescription(NO_USER_MENTIONED_ERROR_MESSAGE);
        isError = true;
      }
    }

    if (!isError) {
      const pastTenseTransaction = UTILITY_HELPER
        .getPastTenseTransaction(transactionType);

      const {
        username: recipientName,
        id: recipientId,
      } = MAIN_HELPER.getUserFromMention(userMention, client);

      let balanceUserId;
      let balanceUsername;
      let receiverName;

      if (isAddRemove) {
        balanceUserId = recipientId;
        balanceUsername = recipientName;
        receiverName = recipientName;
        const transactionAmount = transactionType === 'remove' ? -amount : amount;
        WALLETS.add(recipientId, transactionAmount, fromAccount);
      }

      if (isDepositWithdraw || isTransfer) {
        balanceUserId = authorId;
        balanceUsername = username;
        receiverName = isTransfer ? recipientName : username;
        const receiverId = isTransfer ? recipientId : authorId;
        toAccount = isDeposit ? 'bank' : toAccount;

        WALLETS.add(authorId, -amount, fromAccount);
        WALLETS.add(receiverId, amount, toAccount);
      }

      const walletBalance = WALLETS.getBalance(balanceUserId, 'wallet');
      const bankBalance = WALLETS.getBalance(balanceUserId, 'bank');

      const toFromText = UTILITY_HELPER.getToFromText(transactionType);

      const isWithdraw = transactionType === 'withdraw';
      let messageAccount = isWithdraw ? 'bank' : toAccount;
      messageAccount = isAddRemove ? fromAccount : messageAccount;

      const transactionMessage = TRANSACTION_MESSAGE
        .replace('%transaction%', pastTenseTransaction)
        .replace('%symbol%', currencySymbol)
        .replace('%amount%', amount)
        .replace('%toFrom%', toFromText)
        .replace('%name%', `${receiverName}'s`)
        .replace('%type%', messageAccount);

      const walletBalanceMessage = BALANCE_MESSAGE
        .replace('%name%', balanceUsername)
        .replace('%type%', 'wallet')
        .replace('%symbol%', currencySymbol)
        .replace('%balance%', walletBalance);

      const bankBalanceMessage = BALANCE_MESSAGE
        .replace('%name%', balanceUsername)
        .replace('%type%', 'bank')
        .replace('%symbol%', currencySymbol)
        .replace('%balance%', bankBalance);

      const capitalizedPastTransaction = UTILITY_HELPER
        .getCapitalizedString(pastTenseTransaction);

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
