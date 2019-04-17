module.exports = {


  friendlyName: 'Add labels to issue',


  description: 'Add one or more labels to an issue on GitHub.',


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

    issueNumber: {
      description: 'The number of the issue to add a label to.',
      extendedDescription: 'Note that issue numbers are not globally unique-- they are only unique per-repository.',
      example: 237,
      required: true
    },

    labels: {
      description: 'The labels to add.',
      example: ['Waiting to close'],
      required: true
    }

  },


  exits: {

    success: {
      description: 'Successfully added labels to issue.',
    },

  },


  fn: function (inputs,exits) {

    var sendGithubApiRequest = require('machine').build(require('./private/send-github-api-request')).customize({
      arginStyle: 'serial',
      execStyle: 'natural'
    });


    // Close issue
    sendGithubApiRequest.with({

      method: 'POST',

      url: '/repos/'+inputs.owner+'/'+inputs.repo+'/issues/'+inputs.issueNumber+'/labels',

      body: inputs.labels,

      credentials: inputs.credentials

    }).switch({
      error: exits.error,
      success: function (unusedApiResponse) {
        return exits.success();
      }
    });

  },


};
