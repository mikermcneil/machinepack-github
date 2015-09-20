// This is a little helper pack with some private machines.
var _ = require('lodash');
var Machine = require('machine');

module.exports = {
  normalizeCredentials: Machine.build(_.extend({identity: 'normalize-credentials' }, require('./machines/normalize-credentials'))),
  sendGithubApiRequest: Machine.build(_.extend({identity: 'send-github-api-request' }, require('./machines/send-github-api-request'))),
};
