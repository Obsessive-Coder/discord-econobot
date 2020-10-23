const { writeFile } = require('fs');
const { join } = require('path');

// Config file.
const { economyConfig } = require('../config');

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

      return message.channel
        .send(`${successMessage} ${value}`);
    });
  }
};
