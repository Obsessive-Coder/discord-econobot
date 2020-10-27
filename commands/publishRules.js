const { MessageEmbed } = require('discord.js');
const { writeFile } = require('fs');
const { join } = require('path');

const RULES_MESSAGE_ID = require('../config/rulesMessageId');

// Constants.
const RULES_CONFIG = require('../constants/rules');
const { PUBLISH_RULES } = require('../constants/configCommands');
const {
  INVALID_ROLE_MESSAGE, CONFIG_ERROR_TITLE,
} = require('../constants/messages');

// Helpers.
const { LOGGER } = require('../helpers');

module.exports = {
  ...PUBLISH_RULES,
  execute: async message => {
    const { roles } = message.member;
    const isUserRole = roles.cache.some(role => role.name === 'Leadership');

    // The message sent back to the user.
    const messageEmbed = new MessageEmbed()
      .setColor('RED')
      .setTitle(CONFIG_ERROR_TITLE);

    let isError = false;
    if (!isUserRole) {
      const description = INVALID_ROLE_MESSAGE.replace('%role%', 'Leadership');
      messageEmbed.setDescription(description);
      isError = true;
    }

    if (!isError) {
      const ruleKeys = Object.keys(RULES_CONFIG);

      messageEmbed
        .setColor('BLUE')
        .setTitle('Server Rules')
        .addFields(ruleKeys.map(key => ({
          name: key,
          value: RULES_CONFIG[key],
        })));
    }

    const rulesChannel = message.guild.channels.cache
      .find(channel => channel.name === 'rules');

    const oldMessages = await rulesChannel.messages.fetch();
    rulesChannel.bulkDelete(oldMessages);

    await rulesChannel.send(messageEmbed);

    RULES_MESSAGE_ID.messageId = rulesChannel.lastMessageID;

    const fileData = JSON.stringify(RULES_MESSAGE_ID, null, 2);
    const savePath = join(__dirname, '../config/rulesMessageId.json');

    writeFile(savePath, fileData, error => {
      if (error) {
        LOGGER.log('error', error);
      }
    });
  },
};
