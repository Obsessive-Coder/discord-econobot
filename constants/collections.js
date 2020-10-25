const variables = {
  ACCOUNT_TYPES: ['wallet', 'bank'],
};

// Export each individually.
Object.keys(variables).forEach(key => {
  module.exports[key] = variables[key];
});

module.exports = variables;
