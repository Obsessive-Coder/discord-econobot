const { writeFile } = require('fs');
const { join } = require('path');
const { MessageEmbed } = require('discord.js');

// Constants.
const { CURRENCY_SYMBOL_FIELD } = require('../constants/configCommands');
const {
  NAN_ERROR_MESSAGE, INVALID_ARGUMENT_ERROR_MESSAGE,
} = require('../constants/messages');
const { FLOAT_REGEX } = require('../constants/regex');

// Config file.

const {
  ECONOMY_CONFIG,
  DEFAULT_ECONOMY_CONFIG: { currencySymbol },
} = require('../config');

module.exports = class CONFIG_HELPER {
  static saveConfig(message, configField, value, successMessage) {
    let parsedValue = value;
    let valuePrepend = '';
    if (configField !== CURRENCY_SYMBOL_FIELD) {
      const isNumber = FLOAT_REGEX.test(value);
      parsedValue = parseInt(value, 10);

      if (!isNumber || Number.isNaN(parsedValue)) {
        return message.reply(NAN_ERROR_MESSAGE);
      }

      valuePrepend = ECONOMY_CONFIG.currencySymbol || currencySymbol;
    }

    if (!value) {
      return message.reply(INVALID_ARGUMENT_ERROR_MESSAGE);
    }

    // Set the value.
    ECONOMY_CONFIG[configField] = parsedValue;

    // Convert to JSON.
    const fileData = JSON.stringify(ECONOMY_CONFIG, null, 2);

    return writeFile(join(__dirname, '../config/economy.json'), fileData, error => {
      if (error) {
        return message.reply(error.message);
      }

      const { author } = message;
      const { username } = author;

      const embed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor(username, author.displayAvatarURL())
        .setDescription(`${successMessage} ${valuePrepend}${parsedValue}`);

      return message.channel.send(embed);
    });
  }
};
