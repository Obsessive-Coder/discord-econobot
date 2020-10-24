const { MessageEmbed } = require('discord.js');

// Config variables.
const { prefix } = require('../config/app');

// Constants.
const {
  ALL_HELP_TITLE,
  ALL_HELP_DESCRIPTION,
  INVALID_COMMAND_MESSAGE,
} = require('../constants/messages');

module.exports = class HelpHelper {
  static getAllHelpMessage(commands) {
    return new MessageEmbed()
      .setTitle(ALL_HELP_TITLE)
      .addFields(
        commands.map(({ name, usage }) => ({
          name,
          value: `${prefix}${name} ${usage}`,
        })),
      )
      .setDescription(ALL_HELP_DESCRIPTION.replace('%prefix%', prefix));
  }

  static getCommandHelpMessage(command) {
    const helpMessage = new MessageEmbed();

    if (!command) {
      helpMessage.setTitle(INVALID_COMMAND_MESSAGE);
      return helpMessage;
    }

    const {
      name, aliases, description, usage, cooldown,
    } = command;

    helpMessage.setTitle(`Name: ${name}`);

    if (description) {
      helpMessage.setDescription(description);
    }

    const fields = [];

    if (aliases) {
      fields.push({
        name: 'Aliases',
        value: aliases.join('\n'),
      });
    }

    if (usage) {
      fields.push({
        name: 'Usage',
        value: `${prefix}${name} ${usage}`,
      });
    }

    fields.push({
      name: 'Cooldown',
      value: `${cooldown || 3} second(s)`,
    });

    helpMessage.addFields(fields);

    return helpMessage;
  }
};
