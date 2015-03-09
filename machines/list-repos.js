module.exports = {

  friendlyName: 'List repos',
  description: 'Fetch the list of repos belonging to the specified Github user or organization.',
  cacheable: true,

  inputs: {
    owner: {
      description: 'The name of the user or organization (i.e. as it appears in the URL on GitHub)',
      example: 'balderdashy',
      required: true
    },
    limit: {
      description: 'Maximum number of repos to retrieve (for pagination)',
      example: 30
    },
    skip: {
      description: 'Index of the first repo to retrieve, starting from 0 (for pagination)',
      example: 0
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred'
    },
    success: {
      variableName: 'repos',
      example: [{
        "id": 1296269,
        "owner": {
          "login": "octocat",
          "id": 1,
          "avatar_url": "https://github.com/images/error/octocat_happy.gif",
          "gravatar_id": "somehexcode",
          "url": "https://api.github.com/users/octocat",
          "html_url": "https://github.com/octocat",
          "followers_url": "https://api.github.com/users/octocat/followers",
          "following_url": "https://api.github.com/users/octocat/following{/other_user}",
          "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
          "organizations_url": "https://api.github.com/users/octocat/orgs",
          "repos_url": "https://api.github.com/users/octocat/repos",
          "events_url": "https://api.github.com/users/octocat/events{/privacy}",
          "received_events_url": "https://api.github.com/users/octocat/received_events",
          "type": "User",
          "site_admin": false
        },
        "name": "Hello-World",
        "full_name": "octocat/Hello-World",
        "description": "This your first repo!",
        "private": false,
        "fork": false,
        "url": "https://api.github.com/repos/octocat/Hello-World",
        "html_url": "https://github.com/octocat/Hello-World",
        "clone_url": "https://github.com/octocat/Hello-World.git",
        "git_url": "git://github.com/octocat/Hello-World.git",
        "ssh_url": "git@github.com:octocat/Hello-World.git",
        "svn_url": "https://svn.github.com/octocat/Hello-World",
        "mirror_url": "git://git.example.com/octocat/Hello-World",
        "homepage": "https://github.com",
        "language": null,
        "forks_count": 9,
        "stargazers_count": 80,
        "watchers_count": 80,
        "size": 108,
        "default_branch": "master",
        "open_issues_count": 0,
        "has_issues": true,
        "has_wiki": true,
        "has_downloads": true,
        "pushed_at": "2011-01-26T19:06:43Z",
        "created_at": "2011-01-26T19:01:12Z",
        "updated_at": "2011-01-26T19:14:43Z",
        "permissions": {
          "admin": false,
          "push": false,
          "pull": true
        }
      }]
    }
  },

  fn: function(inputs, exits) {

    var Github = require('github');

    var limit = inputs.limit || 30;
    var skip = inputs.skip || 0;

    var github = new Github({
      version: '3.0.0'
    });

    github.repos.getFromUser({
      user: inputs.owner,
      per_page: limit,
      page: Math.ceil(skip / limit)
    }, function(err, data) {
      if (err) return exits.error(err);
      return exits.success(data);
    });
  }

};
