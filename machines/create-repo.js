module.exports = {

  friendlyName: 'Create repo',
  description: 'Create a new GitHub repository in the specified organization.',

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
      description: 'The GitHub username (to authenticate with)',
      example: 'mikermcneil',
      required: true
    },
    password: {
      description: 'The GitHub password (to authenticate with)',
      example: 'l0lcatzz',
      required: true,
      protect: true
    },
    homepage: {
      description: 'A homepage URL to include on the new repo',
      example: 'http://node-machine.org/machinepack-foo'
    },
    description: {
      description: 'A short description to include on the new repo',
      example: 'A utility for working with direwolves.'
    },
    private: {
      description: 'Whether or not the new repo should be private (defaults to false, i.e. open-source)',
      example: false
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    userMismatch: {
      description: 'Failed; can only create repo for an organization or the user whose credentials were used for authentication (i.e. provided as `username`)'
    },
    success: {
      description: 'Done.'
    }
  },

  fn: function(inputs, exits) {

    // Dependencies
    var _ = require('lodash');
    var Github = require('github');
    var Machine = require('machine');



    var github = new Github({
      version: '3.0.0',
    });

    // Authenticate
    github.authenticate({
      type: 'basic',
      username: inputs.username,
      password: inputs.password
    });

    Machine.build(require('./get-user-details'))({
      user: inputs.user
    }).exec({
      error: exits.error,
      success: function (user){

        // Now send the appropriate request to create a new repo:

        // http://mikedeboer.github.io/node-github/#repos.prototype.createFromOrg
        if (user.isOrganization) {
          return (function _ifOrganization(){
            github.repos.createFromOrg(_stripUndefinedKeys({
              has_wiki: false,
              has_issues: true,
              description: inputs.description||undefined,
              homepage: inputs.homepage||undefined,
              org: inputs.user,
              name: inputs.repo,
              private: inputs.private||undefined
            }), function(err, data) {
              if (err) return exits.error(err);
              return exits.success(data);
            });
          })();
        }

        // Since the provided `user` is not an organization, we must check that
        // it matches the username provided for authentication.  Otherwise this
        // won't work.
        if (inputs.user !== inputs.username) {
          return exits.userMismatch();
        }

        // or http://mikedeboer.github.io/node-github/#repos.prototype.create
        github.repos.create(_stripUndefinedKeys({
          has_wiki: false,
          has_issues: true,
          description: inputs.description||undefined,
          homepage: inputs.homepage||undefined,
          name: inputs.repo,
          private: inputs.private||undefined
        }), function(err, data) {
          if (err) return exits.error(err);
          return exits.success(data);
        });

      }
    });


    /**
     * (just a helper function)
     *
     * @param {Object} obj
     * @return {Object}
     * @api private
     */
    function _stripUndefinedKeys(obj) {
      return _.pick(obj, function _stripKeysWithUndefinedValues(val) {
        return !_.isUndefined(val);
      });
    }

  }

};
