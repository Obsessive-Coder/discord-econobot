const variables = {
  READY_MESSAGE: 'Economy bot is ready.',
  COMMAND_ERROR_MESSAGE: 'There was an error trying to execute the command!',
};

// Export each individually.
Object.keys(variables).forEach(key => {
  module.exports[key] = variables[key];
});

module.exports = variables;
