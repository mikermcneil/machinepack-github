module.exports = {

  friendlyName: 'List repo commits',
  description: 'Fetch recent commits from the specified GitHub repository.',
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
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred'
    },
    success: {
      example: [{
        author: {
          username: 'sgress454',
          avatarUrl: 'https://avatars.githubusercontent.com/u/583701?v=3',
          profileUrl: 'https://github.com/sgress454'
        },
        commitUrl: 'https://github.com/balderdashy/sails/commit/5685d673dc346f226a229021af38556062e32a3d',
        timestamp: '2015-04-14T21:14:43Z'
      }]
    }
  },

  fn: function(inputs, exits) {

    var Github = require('github');
    var _ = require('lodash');

    var github = new Github({
      version: '3.0.0'
    });

    github.repos.getCommits({
      repo: inputs.repo,
      user: inputs.owner
    }, function(err, data) {
      console.log(err);
      if (err) return exits.error(err);

      var commits = [];

      _.each(data, function(commit){
        commits.push({
          author: {
            username: commit.author.login,
            avatarUrl: commit.author.avatar_url,
            profileUrl: commit.author.html_url
          },
          commitUrl: commit.html_url,
          timestamp: commit.commit.author.date
        });
      });
      return exits.success(commits);
    });
  }

};
