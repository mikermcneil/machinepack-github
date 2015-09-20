module.exports = {


  friendlyName: 'Close issue',


  description: 'Close an issue on GitHub.',


  extendedDescription: 'The issue with the specified issue number, within the specified owner and repository will be closed.  Note that issue numbers are not globally unique-- they are only unique per-repository.',


  inputs: {

    username: {
      description: 'Your GitHub username (to authenticate with)',
      example: 'mikermcneil',
      required: true
    },

    password: {
      description: 'Your GitHub password (to authenticate with)',
      example: 'l0lcatzz',
      required: true,
      protect: true
    },

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

    var util = require('util');
    var _ = require('lodash');
    var Http = require('machinepack-http');


    // Close issue
    Http.sendHttpRequest({
      // See https://developer.github.com/v3/issues/#edit-an-issue
      method: 'patch',
      url: '/repos/'+inputs.owner+'/'+inputs.repo+'/issues/'+inputs.issueNumber,
      params: {
        state: 'closed'
      },
      headers: {
        'authorization': 'Basic ' + (new Buffer(inputs.username + ':' + inputs.password, 'ascii').toString('base64')),
        'User-Agent': 'machinepack-github',
      },
      baseUrl: 'https://api.github.com',
    }).exec({

      error: function(err) {
        return exits.error(err);
      },

      success: function(httpResponse) {
        return exits.success();
      }
    });
  },



};
