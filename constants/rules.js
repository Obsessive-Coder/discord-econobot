const variables = {
  KOS: 'No KOS unless in KOS areas.',
  RAIDS: 'No base raiding.',
  EXPLOITS: 'No using game exploits for advantages.',
  GLITCHING: 'No glitching into other bases.'
};

// Export each individually.
Object.keys(variables).forEach(key => {
  module.exports[key] = variables[key];
});

module.exports = variables;
