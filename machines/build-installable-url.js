module.exports = {

  friendlyName: 'Build installable URL',
  description: 'Build an npm-installable URL compatible with private repos.',

  inputs: {
    personalAccessToken: {
      description: 'A personal access token',
      example: 'x32929hghakg1ghdsgkj',
      required: true,
      whereToGet: {
        url: 'https://github.com/settings/applications',
        description: 'Copy and paste a personal access token, or generate one if you haven\'t already.'
      }
    },
    repo: {
      description: 'The name of the Github repo (i.e. as it appears in the URL on GitHub)',
      example: 'private-customer-app',
      required: true
    },
    owner: {
      description: 'The name of the organization or user under which the new repo should be created (i.e. as it appears in the URL on GitHub)',
      example: 'balderdashy',
      required: true
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Done.',
      example: 'git+https://x32929hghakg1ghdsgkj:x-oauth-basic@github.com/balderdashy/private-customer-app.git'
    }
  },

  fn: function(inputs, exits) {

    // Dependencies
    var _ = require('lodash');
    var util = require('util');

    return exits.success(util.format('git+https://%s:x-oauth-basic@github.com/%s/%s.git',inputs.personalAccessToken, inputs.owner, inputs.repo));

  }

};
