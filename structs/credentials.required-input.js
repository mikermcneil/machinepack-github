var _ = require('@sailshq/lodash');
module.exports = _.extend({}, _.merge(require('./credentials.optional-input'), {
  required: true
}));
