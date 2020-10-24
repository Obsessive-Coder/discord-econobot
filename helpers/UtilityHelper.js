module.exports = class UtilityHelper {
  static getCapitalizedString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};
