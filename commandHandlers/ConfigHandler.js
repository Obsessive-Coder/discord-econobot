const { writeFile } = require('fs');
const { join } = require('path');
const { MessageEmbed } = require('discord.js');

// Constants.
const { CURRENCY_SYMBOL_FIELD } = require('../constants/configCommands');
const {
  INVALID_ROLE_MESSAGE, CONFIG_ERROR_TITLE, AMOUNT_ERROR_MESSAGE,
  CONFIG_SET_TITLE, CONFIG_SET_MESSAGE,
} = require('../constants/messages');

// Helpers.
const { UTILITY_HELPER } = require('../helpers');

// Config file.
const { ECONOMY_CONFIG } = require('../config');

module.exports = class ConfigHandler {
  constructor(message, value, configField) {
    this.error = false;
    this.message = message;
    this.configField = configField;
    this.value = value;

    // The message sent back to the user.
    this.messageEmbed = new MessageEmbed()
      .setColor('RED')
      .setTitle(CONFIG_ERROR_TITLE);

    this.setConfig();
  }

  setConfig() {
    const { roles } = this.message.member;
    this.validateRole(roles, 'Leadership');

    let valuePrepend = '';

    if (!this.isError && this.configField !== CURRENCY_SYMBOL_FIELD) {
      this.value = parseInt(this.value, 10);
      this.validateNumber();

      valuePrepend = ECONOMY_CONFIG.currencySymbol;
    }

    if (!this.isError) {
      // Set the value.
      ECONOMY_CONFIG[this.configField] = this.value;

      // Convert to JSON.
      const fileData = JSON.stringify(ECONOMY_CONFIG, null, 2);

      return writeFile(join(__dirname, '../config/economy.json'), fileData, error => {
        if (error) {
          this.messageEmbed.setDescription(error);
          this.isError = true;
        }

        if (!this.isError) {
          let configFieldText = UTILITY_HELPER
            .getSeparatedString(this.configField);

          configFieldText = UTILITY_HELPER
            .getCapitalizedString(configFieldText);

          const title = CONFIG_SET_TITLE.replace('%type%', configFieldText);

          const successMessage = CONFIG_SET_MESSAGE
            .replace('%type%', configFieldText);

          this.messageEmbed
            .setColor('GREEN')
            .setTitle(title)
            .setDescription(`${successMessage} ${valuePrepend}${this.value}`);
        }

        return this.message.channel.send(this.messageEmbed);
      });
    }

    return this.message.channel.send(this.messageEmbed);
  }

  validateRole(roles, roleName) {
    const isUserRole = roles.cache.some(role => role.name === roleName);

    if (!isUserRole) {
      const description = INVALID_ROLE_MESSAGE.replace('%role%', roleName);
      this.messageEmbed.setDescription(description);
      this.isError = true;
    }
  }

  validateNumber() {
    if (!this.validateNumber || Number.isNaN(this.value) || this.value < 0) {
      this.messageEmbed.setDescription(AMOUNT_ERROR_MESSAGE);
      this.isError = true;
    }
  }
};
