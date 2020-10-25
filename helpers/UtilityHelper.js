module.exports = class UTILITY_HELPER {
  static getCapitalizedString(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  static getUpperCaseSnakeCase(value) {
    return value
      .replace(/[A-Z]/g, char => `_${char.toLowerCase()}`)
      .replace(/^_/, '')
      .toUpperCase();
  }
};
