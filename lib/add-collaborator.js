module.exports = {


  friendlyName: 'Add collaborator',


  description: 'Add a collaborator to a repo',


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

    username: {
      description: 'Username of user to add as collaborator.',
      example: 'sailsbot',
      required: true
    },

    permission: {
      description: 'Permissions to give the new collaborator',
      example: 'pull',
      defaultsTo: 'pull'
    },

  },


  exits: {

    success: {
      description: 'Successfully added collaborator to repo.',
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

      method: 'PUT',

      url: '/repos/'+inputs.owner+'/'+inputs.repo+'/collaborators/'+inputs.username,

      params: {
        permission: inputs.permission
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
