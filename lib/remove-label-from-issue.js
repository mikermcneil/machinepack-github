module.exports = {


  friendlyName: 'Remove label from issue',


  description: 'Remove a label from an issue on GitHub.',


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

    label: {
      description: 'The label to remove.',
      example: 'Waiting to close',
      required: true
    }

  },


  exits: {

    success: {
      description: 'Successfully added labels to issue.',
    },

  },


  fn: function (inputs,exits) {

    var Helpers = require('../helpers');


    // Close issue
    Helpers.sendGithubApiRequest({

      method: 'DELETE',

      url: '/repos/'+inputs.owner+'/'+inputs.repo+'/issues/'+inputs.issueNumber+'/labels/' + inputs.label,

      credentials: inputs.credentials

    }).exec({
      error: exits.error,
      success: function (apiResponse) {
        return exits.success();
      }
    });

  },


};
