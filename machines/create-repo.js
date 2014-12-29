module.exports = {

  friendlyName: 'Create repo',
  description: 'Create a new GitHub repository in the specified organization.',
  cacheable: true,

  inputs: {
    repo: {
      description: 'The name for the new GitHub repo (i.e. as it appears in the URL on GitHub)',
      example: 'sails',
      required: true
    },
    user: {
      description: 'The name of the organization or user under which the new repo should be created (i.e. as it appears in the URL on GitHub)',
      example: 'balderdashy',
      required: true
    },
    username: {
      description: 'The GitHub username of the user or one of the organization\'s owner',
      example: 'mikermcneil',
      required: true
    },
    password: {
      description: 'The GitHub password of the user or one of the organization\'s owner',
      example: 'l0lcatzz',
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


    var github = new Github({
      version: '3.0.0',
    });

    // Authenticate
    github.authenticate({
      type: "basic",
      username: inputs.username,
      password: inputs.password
    });

    // http://mikedeboer.github.io/node-github/#repos.prototype.createFromOrg
    //  -or-
    // http://mikedeboer.github.io/node-github/#repos.prototype.create

    // Send request to create repo
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
