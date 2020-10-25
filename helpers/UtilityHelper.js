// Destruct constants.
const { ACCOUNT_TYPES } = require('../constants/collections');
const { FLOAT_REGEX, USER_MENTION_REGEX } = require('../constants/regex');

module.exports = class UTILITY_HELPER {
  static getCapitalizedString(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  static getUpperSnakeCase(value) {
    return value
      .replace(/[A-Z]/g, char => `_${char.toLowerCase()}`)
      .replace(/^_/, '')
      .toUpperCase();
  }

  static getArgsAccountType(commandArguments) {
    // Get the first argument that is not a mention or number.
    const accountType = commandArguments.find(arg => {
      const isMention = USER_MENTION_REGEX.test(arg);
      const isNumber = FLOAT_REGEX.test(arg);
      const isAccountType = ACCOUNT_TYPES.includes(arg);

      return !isMention && !isNumber && isAccountType;
    });

    return accountType || ACCOUNT_TYPES[0];
  }

  static getArgsAmount(commandArguments) {
    return commandArguments.find(arg => {
      const isMention = USER_MENTION_REGEX.test(arg);
      const isNumber = FLOAT_REGEX.test(arg);

      return !isMention && isNumber;
    });
  }
};
