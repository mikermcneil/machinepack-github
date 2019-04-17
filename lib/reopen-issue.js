module.exports = {


  friendlyName: 'Reopen issue',


  description: 'Reopen an issue on GitHub.',


  extendedDescription: 'The issue with the specified issue number, within the specified owner and repository will be reopened if it is closed.',


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
      description: 'Successfully reopened issue.',
    },

  },


  fn: function (inputs,exits) {

    var Helpers = require('../helpers');


    // Close issue
    Helpers.sendGithubApiRequest({

      method: 'patch',

      url: '/repos/'+inputs.owner+'/'+inputs.repo+'/issues/'+inputs.issueNumber,

      params: {
        state: 'open'
      },

      credentials: inputs.credentials

    }).exec({
      error: exits.error,
      success: function (apiResponse) {
        return exits.success();
      }
    });

  },


};
