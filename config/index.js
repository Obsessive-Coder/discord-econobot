const { readdirSync } = require('fs');
const { basename, join } = require('path');
const UTILITY_HELPER = require('../helpers/UtilityHelper');

const fileName = basename(__filename);

const files = readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0
    && file !== fileName
    && (file.slice(-3) === ('.js') || file.slice(-5) === ('.json'))
  ));

const exportVariables = {};

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const name = file.split('.js')[0];
  const upperSnakeName = UTILITY_HELPER.getUpperSnakeCase(name);
  const finalName = `${upperSnakeName}_CONFIG`;

  const config = require(join(__dirname, file));

  exportVariables[finalName] = config;
  module.exports[finalName] = config;
}

module.exports = exportVariables;
