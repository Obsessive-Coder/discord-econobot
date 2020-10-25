const { MessageEmbed } = require('discord.js');

// Constants.
const {
  COMMANDS_CONSTANTS, MESSAGES_CONSTANTS,
} = require('../constants');

// Helpers.
const {
  WALLETS, UTILITY_HELPER,
} = require('../helpers');

// Destruct constants.
const { SHOW_LEADERBOARD } = COMMANDS_CONSTANTS;
const {
  LEADERBOARD_TITLE,
} = MESSAGES_CONSTANTS;

module.exports = {
  ...SHOW_LEADERBOARD,
  execute(message, args) {
    const accountType = UTILITY_HELPER.getArgsAccountType(args);

    const isTotalLeaderboard = args.includes('total');

    const { cache: usersCache } = message.client.users;

    const leaders = UTILITY_HELPER
      .getLeaders(WALLETS, accountType, isTotalLeaderboard, usersCache);

    const messageFields = UTILITY_HELPER
      .getLeaderboardFields(leaders, accountType, isTotalLeaderboard, usersCache);

    const capitalizedType = UTILITY_HELPER.getCapitalizedString(accountType);
    const leaderboardType = isTotalLeaderboard ? 'Total' : capitalizedType;

    const messageEmbed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle(LEADERBOARD_TITLE.replace('%type%', leaderboardType))
      .addFields(messageFields);

    message.channel.send(messageEmbed);
  },
};
