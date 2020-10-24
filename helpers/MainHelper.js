const { Collection } = require('discord.js');

// Config.
const { prefix } = require('../config/app');

// Constants.
const {
  COOLDOWN_MESSAGE,
  INVALID_ARGUMENT_ERROR_MESSAGE,
  USAGE_ERROR_MESSAGE,
} = require('../constants/messages');

module.exports = class MainHelper {
  static handleCooldowns(message, cooldowns, name, cooldown, authorId) {
    if (!cooldowns.has(name)) {
      cooldowns.set(name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(name);
    const cooldownAmount = (cooldown || 3) * 1000;

    if (timestamps.has(authorId)) {
      const expirationTime = timestamps.get(authorId) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
        message.reply(
          COOLDOWN_MESSAGE.replace('%timeLeft%', timeLeft).replace('%name%', name),
        );

        return true;
      }

      return false;
    }

    timestamps.set(authorId, now);
    setTimeout(() => timestamps.delete(authorId), cooldownAmount);
    return false;
  }

  static handleArgsCount(message, command, argsLength, author) {
    const {
      name, isArgsRequired, requiredArgsCount, usage,
    } = command;

    if (isArgsRequired && argsLength < requiredArgsCount) {
      let reply = `${INVALID_ARGUMENT_ERROR_MESSAGE}, ${author}!`;

      if (command.usage) {
        reply += `\n${USAGE_ERROR_MESSAGE} \`${prefix}${name} ${usage}\``;
      }

      message.channel.send(reply);

      return false;
    }
    return true;
  }
};
