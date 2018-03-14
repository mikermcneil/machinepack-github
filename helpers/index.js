// This is a little helper pack with some private machines.
var _ = require('@sailshq/lodash');
var Machine = require('machine');

module.exports = {
  normalizeCredentials: Machine.build(_.extend({identity: 'normalize-credentials' }, require('./lib/normalize-credentials'))),
  sendGithubApiRequest: Machine.build(_.extend({identity: 'send-github-api-request' }, require('./lib/send-github-api-request'))),
};
