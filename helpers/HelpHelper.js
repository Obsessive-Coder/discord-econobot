const { MessageEmbed } = require('discord.js');

// Config variables.
const { prefix } = require('../config/app');

// Constants.
const {
  ALL_HELP_TITLE,
  HELP_LEGEND,
  HELP_EXAMPLE,
  ALL_HELP_DESCRIPTION,
  INVALID_COMMAND_MESSAGE,
} = require('../constants/messages');

module.exports = class HelpHelper {
  static getAllHelpMessage(commands) {
    const description = `${ALL_HELP_DESCRIPTION}\n${HELP_LEGEND}${HELP_EXAMPLE}`
      .replace(/%prefix%/g, prefix);

    return new MessageEmbed()
      .setTitle(ALL_HELP_TITLE)
      .addFields(
        commands.map(({ name, usage }) => ({
          name,
          value: `\`${prefix}${name} ${usage}\``,
        })),
      )
      .setDescription(description);
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

    const fullDescription = `${description}\n${HELP_LEGEND}`
      .replace(/%prefix%/g, prefix);

    helpMessage.setDescription(fullDescription);

    const fields = [];

    if (usage) {
      fields.push({
        name: 'Usage',
        value: `\`${prefix}${name} ${usage}\``,
      });
    }

    if (aliases) {
      fields.push({
        name: 'Aliases',
        value: aliases.join('\n'),
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
