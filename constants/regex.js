const FLOAT_REGEX = /^\d+(\.\d{1,2})?$/;
const USER_MENTION_REGEX = /^<@!?(\d+)>$/;

module.exports.FLOAT_REGEX = FLOAT_REGEX;
module.exports.USER_MENTION_REGEX = USER_MENTION_REGEX;

module.exports = {
  FLOAT_REGEX,
  USER_MENTION_REGEX,
};
