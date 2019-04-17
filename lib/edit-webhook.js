module.exports = {


  friendlyName: 'Edit webhook',


  description: 'Edit a webhook in a repo',


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
    },

    id: {
      description: 'The ID of the hook to edit',
      example: 123,
      required: true
    },

    config: {
      description: 'The configuration of the webhook.',
      example: {},
      required: true,
      moreInfoUrl: 'https://developer.github.com/v3/repos/hooks/#create-a-hook'
    },

    events: {
      description: 'List of events to replace current hook events list with',
      example: ['push'],
    },

    addEvents: {
      description: 'List of events to add to current hook events list',
      example: ['push'],
    },

    removeEvents: {
      description: 'List of events to remove from current hook events list',
      example: ['push'],
    },

    active: {
      description: 'Whether or not the hook should be activated',
      example: true,
    }

  },


  exits: {

    success: {
      description: 'Successfully added webhook to repo.',
    },

  },


  fn: function (inputs,exits) {

    // Dependencies
    var Github = require('github');
    var github = new Github({
      version: '3.0.0',
    });

    var sendGithubApiRequest = require('machine').build(require('./private/send-github-api-request')).customize({
      arginStyle: 'serial',
      execStyle: 'natural'
    });


    // Close issue
    sendGithubApiRequest.with({

      method: 'PATCH',

      url: '/repos/'+inputs.owner+'/'+inputs.repo+'/hooks/' + inputs.id,

      params: {
        config: inputs.config,
        events: inputs.events,
        add_events: inputs.addEvents,
        remove_events: inputs.removeEvents,
        active: inputs.active
      },

      credentials: inputs.credentials

    }).switch({
      error: exits.error,
      success: function (unusedApiResponse) {
        return exits.success();
      }
    });

  }

};
