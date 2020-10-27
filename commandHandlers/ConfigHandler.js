const { writeFile } = require('fs');
const { join } = require('path');
const { MessageEmbed } = require('discord.js');

// Constants.
const { CURRENCY_SYMBOL_FIELD } = require('../constants/configCommands');
const {
  INVALID_ROLE_MESSAGE, CONFIG_ERROR_TITLE, AMOUNT_ERROR_MESSAGE,
  CONFIG_SET_TITLE, CONFIG_SET_MESSAGE,
} = require('../constants/messages');

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
    const { member, guild } = this.message;
    this.validateRole(member, guild, 'Leadership');

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
          const title = CONFIG_SET_TITLE.replace('%type%', this.configField);

          const successMessage = CONFIG_SET_MESSAGE
            .replace('%type%', this.configField);

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

  validateRole(member, guild, roleName) {
    const leaderRole = guild.roles.cache
      .find(role => role.name === roleName);

    const roleId = leaderRole ? leaderRole.id : undefined;
    // eslint-disable-next-line no-underscore-dangle
    const userRoleIds = member._roles;

    const isUserRole = userRoleIds.includes(roleId);

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
