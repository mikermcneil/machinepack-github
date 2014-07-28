/**
 * Module dependencies
 */

var github = require('github');

module.exports = {

  id: 'get-repo-commits-at-path',
  moduleName: 'machinepack-github',
  description: 'Fetch recent commits from a github repo at the specifed path.',

  // Whether this machine is referentially transparent
  // (i.e. read-only and free of side effects)
  noSideEffects: true,

  inputs: {
    repo: {
      type: 'string',
      example: 'sails'
    },
    user: {
      type: 'string',
      example: 'balderdashy'
    },
    path: {
      type: 'string',
      example: 'README.md'
    }
  },

  exits: {
    badRequest: {
      example: {
        defaultMessage: 'Bad Request',
        message: 'Empty value for parameter \'user\': undefined',
        code: '400',
        status: 400
      }
    },
    error: {
      example: {
        "message": "Not Found",
        "documentation_url": "https://developer.github.com/v3"
      }
    },
    success: {
      example: [{
        sha: '71c4c195593af43d1d3bc0502a8c92ac5f5197a8',
        commit: {
          author: {
            name: 'sgress454',
            email: 'scottmgress@gmail.com',
            date: '2014-06-10T23:00:59Z'
          },
          committer: {
            name: 'sgress454',
            email: 'scottmgress@gmail.com',
            date: '2014-06-10T23:00:59Z'
          },
          message: 'Update README.md',
          tree: {
            sha: '631c8ce31634a73c11b9b48a81be4fd155371d6e',
            url: 'https://api.github.com/repos/balderdashy/sails/git/trees/631c8ce31634a73c11b9b48a81be4fd155371d6e'
          },
          url: 'https://api.github.com/repos/balderdashy/sails/git/commits/71c4c195593af43d1d3bc0502a8c92ac5f5197a8',
          comment_count: 0
        },
        url: 'https://api.github.com/repos/balderdashy/sails/commits/71c4c195593af43d1d3bc0502a8c92ac5f5197a8',
        html_url: 'https://github.com/balderdashy/sails/commit/71c4c195593af43d1d3bc0502a8c92ac5f5197a8',
        comments_url: 'https://api.github.com/repos/balderdashy/sails/commits/71c4c195593af43d1d3bc0502a8c92ac5f5197a8/comments',
        author: {
          login: 'sgress454',
          id: 553428,
          avatar_url: 'https://avatars.githubusercontent.com/u/553428?',
          gravatar_id: 'b74e07aa543552709bf546ca279c9c67',
          url: 'https://api.github.com/users/sgress454',
          html_url: 'https://github.com/sgress454',
          followers_url: 'https://api.github.com/users/sgress454/followers',
          following_url: 'https://api.github.com/users/sgress454/following{/other_user}',
          gists_url: 'https://api.github.com/users/sgress454/gists{/gist_id}',
          starred_url: 'https://api.github.com/users/sgress454/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/sgress454/subscriptions',
          organizations_url: 'https://api.github.com/users/sgress454/orgs',
          repos_url: 'https://api.github.com/users/sgress454/repos',
          events_url: 'https://api.github.com/users/sgress454/events{/privacy}',
          received_events_url: 'https://api.github.com/users/sgress454/received_events',
          type: 'User',
          site_admin: false
        },
        committer: {
          login: 'sgress454',
          id: 553428,
          avatar_url: 'https://avatars.githubusercontent.com/u/553428?',
          gravatar_id: 'b74e07aa543552709bf546ca279c9c67',
          url: 'https://api.github.com/users/sgress454',
          html_url: 'https://github.com/sgress454',
          followers_url: 'https://api.github.com/users/sgress454/followers',
          following_url: 'https://api.github.com/users/sgress454/following{/other_user}',
          gists_url: 'https://api.github.com/users/sgress454/gists{/gist_id}',
          starred_url: 'https://api.github.com/users/sgress454/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/sgress454/subscriptions',
          organizations_url: 'https://api.github.com/users/sgress454/orgs',
          repos_url: 'https://api.github.com/users/sgress454/repos',
          events_url: 'https://api.github.com/users/sgress454/events{/privacy}',
          received_events_url: 'https://api.github.com/users/sgress454/received_events',
          type: 'User',
          site_admin: false
        },
        parents: [{
          sha: '975273b2dd5b848d1519178a8138369fc6b8fa24',
          url: 'https://api.github.com/repos/balderdashy/sails/commits/975273b2dd5b848d1519178a8138369fc6b8fa24',
          html_url: 'https://github.com/balderdashy/sails/commit/975273b2dd5b848d1519178a8138369fc6b8fa24'
        }]
      }, {
        sha: '431d863b8fc3517354fe1dbbb916be245faf4f87',
        commit: {
          author: {
            name: 'Mike McNeil',
            email: 'mike@balderdash.co',
            date: '2014-06-02T00:35:58Z'
          },
          committer: {
            name: 'Mike McNeil',
            email: 'mike@balderdash.co',
            date: '2014-06-02T00:35:58Z'
          },
          message: 'added community adapters: Azure Tables, Amazon RDS, DynamoDB, etc\n\nomitted Parse, Kinvey, and a few other non-standard adapters b/c this list is getting crazy long- we should do something about organizing it...',
          tree: {
            sha: '96b02b7bfe4df54ec711ef682a416f6e396c74d7',
            url: 'https://api.github.com/repos/balderdashy/sails/git/trees/96b02b7bfe4df54ec711ef682a416f6e396c74d7'
          },
          url: 'https://api.github.com/repos/balderdashy/sails/git/commits/431d863b8fc3517354fe1dbbb916be245faf4f87',
          comment_count: 0
        },
        url: 'https://api.github.com/repos/balderdashy/sails/commits/431d863b8fc3517354fe1dbbb916be245faf4f87',
        html_url: 'https://github.com/balderdashy/sails/commit/431d863b8fc3517354fe1dbbb916be245faf4f87',
        comments_url: 'https://api.github.com/repos/balderdashy/sails/commits/431d863b8fc3517354fe1dbbb916be245faf4f87/comments',
        author: {
          login: 'mikermcneil',
          id: 618009,
          avatar_url: 'https://avatars.githubusercontent.com/u/618009?',
          gravatar_id: '199046437b76e6ca73e00b4cc182a1c5',
          url: 'https://api.github.com/users/mikermcneil',
          html_url: 'https://github.com/mikermcneil',
          followers_url: 'https://api.github.com/users/mikermcneil/followers',
          following_url: 'https://api.github.com/users/mikermcneil/following{/other_user}',
          gists_url: 'https://api.github.com/users/mikermcneil/gists{/gist_id}',
          starred_url: 'https://api.github.com/users/mikermcneil/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/mikermcneil/subscriptions',
          organizations_url: 'https://api.github.com/users/mikermcneil/orgs',
          repos_url: 'https://api.github.com/users/mikermcneil/repos',
          events_url: 'https://api.github.com/users/mikermcneil/events{/privacy}',
          received_events_url: 'https://api.github.com/users/mikermcneil/received_events',
          type: 'User',
          site_admin: false
        },
        committer: {
          login: 'mikermcneil',
          id: 618009,
          avatar_url: 'https://avatars.githubusercontent.com/u/618009?',
          gravatar_id: '199046437b76e6ca73e00b4cc182a1c5',
          url: 'https://api.github.com/users/mikermcneil',
          html_url: 'https://github.com/mikermcneil',
          followers_url: 'https://api.github.com/users/mikermcneil/followers',
          following_url: 'https://api.github.com/users/mikermcneil/following{/other_user}',
          gists_url: 'https://api.github.com/users/mikermcneil/gists{/gist_id}',
          starred_url: 'https://api.github.com/users/mikermcneil/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/mikermcneil/subscriptions',
          organizations_url: 'https://api.github.com/users/mikermcneil/orgs',
          repos_url: 'https://api.github.com/users/mikermcneil/repos',
          events_url: 'https://api.github.com/users/mikermcneil/events{/privacy}',
          received_events_url: 'https://api.github.com/users/mikermcneil/received_events',
          type: 'User',
          site_admin: false
        },
        parents: [{
          sha: '0d0db063533b9a741ee036c8fccf11de6cf94cc9',
          url: 'https://api.github.com/repos/balderdashy/sails/commits/0d0db063533b9a741ee036c8fccf11de6cf94cc9',
          html_url: 'https://github.com/balderdashy/sails/commit/0d0db063533b9a741ee036c8fccf11de6cf94cc9'
        }]
      }]
    }
  },

  fn: function(inputs, exits) {
    try {
      var github = new require('github')({ version: '3.0.0' });

      github.repos.getCommits({
        repo: inputs.repo,
        user: inputs.user,
        path: inputs.path
      }, function(err, data) {
        if (err) {
          if (typeof err === 'object' && +err.code === 400) {
            err.status = 400;
            return exits.badRequest(err);
          }
          return exits.error(err);
        }

        return exits.success(data);
      });
    }
    catch (e) {
      return exits.error(e);
    }
  }

};
