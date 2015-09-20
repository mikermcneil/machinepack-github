module.exports = {


  friendlyName: 'List repo commits at path',


  description: 'Fetch recent commits from a remote GitHub repository within the specifed path.',


  cacheable: true,


  inputs: {
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
    path: {
      description: 'Filter to the specified relative path within the remote repository',
      example: 'foo/bar',
      required: false
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
      description: 'Unexpected error occurred'
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
      }]
    }
  },

  fn: function(inputs, exits) {

    var Github = new require('github');

    try {
      var github = new Github({
        version: '3.0.0',
      });

      github.repos.getCommits({
        repo: inputs.repo,
        user: inputs.owner,
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
