module.exports = {


  friendlyName: 'Create webhook',


  description: 'Add a webhook to a repo',


  inputs: {

    // Credentials are required to comment on an issue.
    credentials: require('../structs/credentials.required-input'),

    owner: {
      description: 'The name of the organization or user that owns the repo (i.e. as it appears in the URL on GitHub)',
      example: 'balderdashy',
      required: true
    },

    repo: {
      description: 'The name of the Github repo (i.e. as it appears in the URL on GitHub)',
      example: 'sails',
      required: true
    },

    headers: {
      description: 'Key/ value pair of request headers to pass along with the HTTP request',
      extendedDescription: 'Valid headers are: "If-Modified-Since", "If-None-Match", "Cookie", "User-Agent", "Accept", "X-GitHub-OTP".',
      example: {}
    },

    config: {
      description: 'The configuration of the webhook.',
      example: {},
      required: true,
      moreInfoUrl: 'https://developer.github.com/v3/repos/hooks/#create-a-hook'
    },

    events: {
      description: 'List of events the hook is triggered for',
      example: ['push'],
      required: true,
      defaultsTo: ['push']
    },

    active: {
      description: 'Whether or not the hook should be immediately activated',
      example: true,
      defaultsTo: true
    }

  },


  exits: {

    success: {
      description: 'Successfully added webhook to repo.',
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

      method: 'POST',

      url: '/repos/'+inputs.owner+'/'+inputs.repo+'/hooks',

      params: {
        name: 'web',
        config: inputs.config,
        events: inputs.events,
        active: inputs.active
      },

      credentials: inputs.credentials

    }).exec({
      error: exits.error,
      success: function (apiResponse) {
        return exits.success();
      }
    });

  }

};
