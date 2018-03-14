module.exports = {

  friendlyName: 'List issue comments',
  description: 'Fetch recent comments from the specified GitHub repository.',
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
    issueNumber: {
      description: 'The issue number of the issue to close.',
      extendedDescription: 'Note that issue numbers are not globally unique-- they are only unique per-repository.',
      example: 237,
      required: true
    }
  },


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
        body: 'Bump +1 I haz this issue too',
        timestamp: '2015-04-14T21:14:43Z',
        id: 187625171,
        url: 'https://github.com/balderdashy/sails/issues/3594#issuecomment-187625171'
      }]
    }
  },

  fn: function(inputs, exits) {

    var Github = require('github');
    var _ = require('lodash');

    var github = new Github({
      version: '3.0.0'
    });

    github.issues.getComments({
      repo: inputs.repo,
      user: inputs.owner,
      number: inputs.issueNumber
    }, function(err, data) {
      try {
        if (err) return exits.error(err);
        var comments = _.map(data, function(commentData){
          return {
            author: {
              username: commentData.user.login,
              avatarUrl: commentData.user.avatar_url,
              profileUrl: commentData.user.html_url,
            },
            body: commentData.body,
            timestamp: commentData.created_at,
            id: commentData.id,
            url: commentData.html_url
          };
        });

        return exits.success(comments);
      }
      catch (e) {
        return exits.error(e);
      }
    });
  }

};
