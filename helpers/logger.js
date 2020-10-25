const winston = require('winston');
const chalk = require('chalk');

// Constants.
const { LOG_LEVEL_COLORS } = require('../constants/collections');

module.exports = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'log' }),
  ],
  format: winston.format.printf(({ level, message }) => {
    const colorMethod = LOG_LEVEL_COLORS[level];
    return `[${chalk[colorMethod](level.toUpperCase())}] - ${message}`;
  }),
});
