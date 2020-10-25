const { readdirSync } = require('fs');
const { basename, join } = require('path');
const UTILITY_HELPER = require('./UtilityHelper');

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
  const finalName = UTILITY_HELPER.getUpperSnakeCase(name);

  const helper = require(join(__dirname, file));

  exportVariables[finalName] = helper;
  module.exports[finalName] = helper;
}

module.exports = exportVariables;
