const { readdirSync } = require('fs');
const { basename, join } = require('path');
const UTILITY_HELPER = require('../helpers/UtilityHelper');

const fileName = basename(__filename);

const files = readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0
    && file !== fileName
    && file.slice(-3) === '.js'
  ));

const exportVariables = {};

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const name = file.split('.js')[0];
  const upperSnakeName = UTILITY_HELPER.getUpperCaseSnakeCase(name);
  const finalName = `${upperSnakeName}_CONSTANTS`;

  const constants = require(join(__dirname, file));

  exportVariables[finalName] = constants;
  module.exports[finalName] = constants;
}

module.exports = exportVariables;
