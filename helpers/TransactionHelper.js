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

    let messageEmbed = new MessageEmbed()
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

      const isWithdraw = transactionType === 'withdraw';
      let messageAccount = isWithdraw ? 'bank' : toAccount;
      messageAccount = isAddRemove ? fromAccount : messageAccount;

      const balanceUser = {
        userId: balanceUserId,
        username: balanceUsername,
      };

      const messages = TransactionHelper.getMessages(
        transactionType, amount, receiverName, balanceUser, messageAccount,
      );

      messageEmbed = TransactionHelper
        .buildMessageEmbed(transactionType, messages);
    }

    message.channel.send(messageEmbed);
  }

  static getMessages(transactionType, amount, receiverName, balanceUser, account) {
    const transactionMessage = TransactionHelper
      .getTransactionMessage(
        transactionType, amount, receiverName, account,
      );

    const { userId, username } = balanceUser;

    const walletBalance = WALLETS.getBalance(userId, 'wallet');
    const bankBalance = WALLETS.getBalance(userId, 'bank');

    const walletBalanceMessage = TransactionHelper
      .getBalanceMessage(username, 'wallet', walletBalance);

    const bankBalanceMessage = TransactionHelper
      .getBalanceMessage(username, 'bank', bankBalance);

    return [transactionMessage, walletBalanceMessage, bankBalanceMessage];
  }

  static buildMessageEmbed(transactionType, messages) {
    const messageTitle = TransactionHelper.getMessageTitle(transactionType);

    return new MessageEmbed()
      .setColor('GREEN')
      .setTitle(messageTitle)
      .setDescription(messages.join('\n'));
  }

  static getCapitalizePastTransaction(transactionType) {
    const pastTenseTransaction = UTILITY_HELPER
      .getPastTenseTransaction(transactionType);

    return UTILITY_HELPER
      .getCapitalizedString(pastTenseTransaction);
  }

  static getMessageTitle(transactionType) {
    const capitalizedPastTransaction = TransactionHelper
      .getCapitalizePastTransaction(transactionType);

    return TRANSACTION_TITLE.replace('%transaction%', capitalizedPastTransaction);
  }

  static getTransactionMessage(transactionType, amount, username, account) {
    const pastTenseTransaction = UTILITY_HELPER
      .getPastTenseTransaction(transactionType);

    const toFromText = UTILITY_HELPER.getToFromText(transactionType);

    return TRANSACTION_MESSAGE
      .replace('%transaction%', pastTenseTransaction)
      .replace('%symbol%', currencySymbol)
      .replace('%amount%', amount)
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
};
