const { writeFile } = require('fs');
const { join } = require('path');
const { MessageEmbed } = require('discord.js');

// Constants.
const { CURRENCY_SYMBOL_FIELD } = require('../constants/commands');

// Config file.

const {
  economyConfig,
  defaultEconomyConfig: { currencySymbol },
} = require('../config');

module.exports = class ConfigHelper {
  static saveConfig(message, configField, value, successMessage) {
    // Set the value.
    economyConfig[configField] = value;

    // Convert to JSON.
    const fileData = JSON.stringify(economyConfig, null, 2);

    writeFile(join(__dirname, '../config/economy.json'), fileData, error => {
      if (error) {
        return message.reply(error.message);
      }

      // console.log(message.author)

      // `<${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`

      const { author } = message;
      const { username } = author;

      const symbol = economyConfig.currencySymbol || currencySymbol;
      const valuePrepend = configField !== CURRENCY_SYMBOL_FIELD ? symbol : '';

      const embed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor(username, author.displayAvatarURL())
        .setDescription(`${successMessage} ${valuePrepend}${value}`);

      message.channel.send(embed);
    });
  }
};
