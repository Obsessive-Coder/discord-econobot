const { MessageEmbed } = require('discord.js');

// Constants.
const {
  COMMAND_CONSTANTS: { HELP },
  MESSAGE_CONSTANTS: {
    UNABLE_TO_DM_MESSAGE,
    SUCCESS_HELP_MESSAGE,
  },
} = require('../constants');

// Helpers.
const { HelpHelper, MainHelper } = require('../helpers');

module.exports = {
  ...HELP,
  execute(message, [commandName]) {
    const { commands } = message.client;

    let helpMessage = new MessageEmbed().setColor('BLUE');

    if (!commandName) {
      helpMessage = HelpHelper.getAllHelpMessage(commands);
    } else {
      const lowerName = commandName.toLowerCase();
      const command = MainHelper.getCommand(commands, lowerName);
      helpMessage = HelpHelper.getCommandHelpMessage(command);
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
