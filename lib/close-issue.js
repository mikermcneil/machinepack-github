module.exports = {


  friendlyName: 'Close issue',


  description: 'Close an issue on GitHub.',


  extendedDescription: 'The issue with the specified issue number, within the specified owner and repository will be closed.',


  inputs: {

    // Credentials are required to close an issue.
    credentials: require('../constants/credentials.required-input'),

    repo: {
      description: 'The name of the Github repo (i.e. as it appears in the URL on GitHub)',
      example: 'sails',
      required: true
    },

    owner: {
      description: 'The name of the organization or user that owns the repo (i.e. as it appears in the URL on GitHub)',
      example: 'balderdashy',
      required: true
    },

    issueNumber: {
      description: 'The issue number of the issue to close.',
      extendedDescription: 'Note that issue numbers are not globally unique-- they are only unique per-repository.',
      example: 237,
      required: true
    }

  },


  exits: {

    success: {
      description: 'Successfully closed issue.',
    },

  },


  fn: function (inputs,exits) {

    var sendGithubApiRequest = require('machine').build(require('./private/send-github-api-request')).customize({
      arginStyle: 'serial',
      execStyle: 'natural'
    });

    // Close issue
    sendGithubApiRequest.with({

      method: 'patch',

      url: '/repos/'+inputs.owner+'/'+inputs.repo+'/issues/'+inputs.issueNumber,

      params: {
        state: 'closed'
      },

      credentials: inputs.credentials

    }).switch({
      error: exits.error,
      success: function (unusedApiResponse) {
        return exits.success();
      }
    });

  },


};
