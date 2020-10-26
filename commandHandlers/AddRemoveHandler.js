// Helpers.
const {
  TRANSACTION_HELPER, MAIN_HELPER, UTILITY_HELPER, WALLETS,
} = require('../helpers');

module.exports = class AddRemoveHelper {
  constructor(message, args, type) {
    this.message = message;
    this.userMention = UTILITY_HELPER.getArgsMention(args);
    this.account = UTILITY_HELPER.getArgsAccountType(args);

    const amount = UTILITY_HELPER.getArgsAmount(args);
    this.amount = type === 'remove' ? -amount : amount;

    this.transaction = new TRANSACTION_HELPER(amount, type);

    this.makeTransaction();
  }

  makeTransaction() {
    const { member, guild } = this.message;
    this.transaction.validateRole(member, guild, 'Leadership');

    if (!this.transaction.isError) {
      this.transaction.validateAmount();
    }

    if (!this.transaction.isError) {
      this.transaction.validateMention(this.userMention);
    }

    if (!this.transaction.isError) {
      const { client } = this.message;

      const { id, username } = MAIN_HELPER
        .getUserFromMention(this.userMention, client);

      WALLETS.add(id, this.amount, this.account);
      this.transaction.buildMessage(id, username, this.account);
    }

    this.message.channel.send(this.transaction.messageEmbed);
  }
};
