const appConfig = require('./app');
const defaultEconomyConfig = require('./defaultEconomy');
const economyConfig = require('./economy');

module.exports.appConfig = appConfig;
module.exports.defaultEconomyConfig = defaultEconomyConfig;
module.exports.economyConfig = economyConfig;

module.exports = {
  appConfig,
  defaultEconomyConfig,
  economyConfig,
};
