module.exports = {

  friendlyName: 'Create repo',
  description: 'Create a new GitHub repository in the specified organization.',
  cacheable: true,

  inputs: {
    repo: {
      description: 'The name for the new Github repo (i.e. as it appears in the URL on GitHub)',
      example: 'sails',
      required: true
    },
    user: {
      description: 'The name of the organization or user under which the new repo should be created (i.e. as it appears in the URL on GitHub)',
      example: 'balderdashy',
      required: true
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Done.'
    }
  },

  fn: function(inputs, exits) {

    // Dependencies
    var _ = require('lodash');
    var Github = require('github');

    // TODO: remove this stub
    console.log('Ran machine');
    return exits.success();


    var github = new Github({
      version: '3.0.0',
    });

    // TODO: authorization

    github.repos.create(_.pick({
      has_wiki: false,
      has_issues: true,
      description: ''||undefined,
      homepage: ''||undefined,
      repo: inputs.repo
    }, function _stripKeysWithUndefinedValues(val){ return !_.isUndefined(val); }), function(err, data) {
      if (err) return exits.error(err);
      else return exits.success(data);
    });
  }

};
