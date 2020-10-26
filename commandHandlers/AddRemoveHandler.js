// Constants.
const { COMMANDS_CONSTANTS } = require('../constants');

// Helpers.
const {
  TRANSACTION_HELPER, NEW_TRANSACTION_HELPER,
  MAIN_HELPER, UTILITY_HELPER, WALLETS,
} = require('../helpers');

// Destruct constants.
const { ADD_MONEY } = COMMANDS_CONSTANTS;

module.exports = class AddRemoveHelper {
  constructor(message, args, type) {
    this.message = message;
    this.userMention = UTILITY_HELPER.getArgsMention(args);
    this.account = UTILITY_HELPER.getArgsAccountType(args);

    const amount = UTILITY_HELPER.getArgsAmount(args);
    this.amount = type === 'remove' ? -amount : amount;

    this.transaction = new NEW_TRANSACTION_HELPER(amount, type);

    this.makeTransaction();
  }

  makeTransaction() {
    this.transaction.validateAmount();

    if (!this.transaction.isError) {
      this.transaction.validateMention(this.userMention);
    }

    const { client } = this.message;

    const {
      id, username,
    } = MAIN_HELPER.getUserFromMention(this.userMention, client);

    WALLETS.add(id, this.amount, this.account);

    const balance = WALLETS.getBalance(id, this.account);

    this.transaction.buildMessage(username, this.account, balance);

    this.message.channel.send(this.transaction.messageEmbed);
  }
};
