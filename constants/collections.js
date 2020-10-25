const variables = {
  ACCOUNT_TYPES: ['wallet', 'bank'],
  LOG_LEVEL_COLORS: {
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    debug: 'magenta',
  },
};

// Export each individually.
Object.keys(variables).forEach(key => {
  module.exports[key] = variables[key];
});

module.exports = variables;
