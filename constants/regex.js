const variables = {
  FLOAT_REGEX: /^\d+(\.\d{1,2})?$/,
  USER_MENTION_REGEX: /^<@!?(\d+)>$/,
};

// Export each individually.
Object.keys(variables).forEach(key => {
  module.exports[key] = variables[key];
});

module.exports = variables;
