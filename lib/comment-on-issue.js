module.exports = {


  friendlyName: 'Comment on issue',


  description: 'Comment on an issue on GitHub.',


  extendedDescription: 'Creates a comment in the issue with the specified issue number, within the specified owner and repository.',


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
      description: 'The number of the issue to comment on.',
      extendedDescription: 'Note that issue numbers are not globally unique-- they are only unique per-repository.',
      example: 237,
      required: true
    },

    comment: {
      description: 'The contents of the comment.',
      extendedDescription: 'GitHub-flavored markdown syntax is supported.',
      example: 'Thanks @cherrybear.  Do _you_ have a link to the PR?',
      required: true
    }

  },


  exits: {

    success: {
      description: 'Successfully commented on issue.',
      variableName: 'newCommentId',
      example: 141755181
    },

  },


  fn: function (inputs,exits) {

    var Helpers = require('../helpers');


    // Close issue
    Helpers.sendGithubApiRequest({

      method: 'POST',

      url: '/repos/'+inputs.owner+'/'+inputs.repo+'/issues/'+inputs.issueNumber+'/comments',

      params: {
        body: inputs.comment
      },

      credentials: inputs.credentials

    }).exec({
      error: exits.error,
      success: function (apiResponse) {
        return exits.success(apiResponse.body.id);
      }
    });

  },


};
