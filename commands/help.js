const { MessageEmbed } = require('discord.js');

// Constants.
const {
  COMMANDS_CONSTANTS: { HELP },
  MESSAGES_CONSTANTS: {
    UNABLE_TO_DM_MESSAGE,
    SUCCESS_HELP_MESSAGE,
  },
} = require('../constants');

// Helpers.
const { HELP_HELPER, MAIN_HELPER } = require('../helpers');

module.exports = {
  ...HELP,
  execute(message, [commandName]) {
    const { commands } = message.client;

    let helpMessage = new MessageEmbed().setColor('BLUE');

    if (!commandName) {
      helpMessage = HELP_HELPER.getAllHelpMessage(commands);
    } else {
      const lowerName = commandName.toLowerCase();
      const command = MAIN_HELPER.getCommand(commands, lowerName);
      helpMessage = HELP_HELPER.getCommandHelpMessage(command);
    }

    helpMessage.setColor('BLUE');

    return message.author.send(helpMessage)
      .then(() => {
        if (message.channel.type === 'dm') return;
        message.reply(SUCCESS_HELP_MESSAGE);
      })
      .catch(() => message.reply(UNABLE_TO_DM_MESSAGE));
  },
};
