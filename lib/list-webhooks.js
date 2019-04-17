module.exports = {


  friendlyName: 'List webhooks',


  description: 'List all webhooks in a repo',


  inputs: {

    // Credentials are required to comment on an issue.
    credentials: require('../constants/credentials.required-input'),

    owner: {
      description: 'The name of the organization or user that owns the repo (i.e. as it appears in the URL on GitHub)',
      example: 'balderdashy',
      required: true
    },

    repo: {
      description: 'The name of the Github repo (i.e. as it appears in the URL on GitHub)',
      example: 'sails',
      required: true
    }

  },


  exits: {

    success: {
      example: [
        {
          "id": 1,
          "url": "https://api.github.com/repos/octocat/Hello-World/hooks/1",
          "test_url": "https://api.github.com/repos/octocat/Hello-World/hooks/1/test",
          "ping_url": "https://api.github.com/repos/octocat/Hello-World/hooks/1/pings",
          "name": "web",
          "events": [
            "push",
            "pull_request"
          ],
          "active": true,
          "config": {
            "url": "http://example.com/webhook",
            "content_type": "json"
          },
          "updated_at": "2011-09-06T20:39:23Z",
          "created_at": "2011-09-06T17:26:27Z"
        }
      ]
    },

  },


  fn: function (inputs,exits) {

     // Dependencies
    var _ = require('@sailshq/lodash');
    var Github = require('github');
    var Machine = require('machine');
    var github = new Github({
      version: '3.0.0',
    });

    var Helpers = require('../helpers');

    // Close issue
    Helpers.sendGithubApiRequest({

      method: 'GET',

      url: '/repos/'+inputs.owner+'/'+inputs.repo+'/hooks',

      credentials: inputs.credentials

    }).exec({
      error: exits.error,
      success: function (apiResponse) {
        return exits.success(apiResponse.body);
      }
    });

  }

};
