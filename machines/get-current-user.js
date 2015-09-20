module.exports = {

  friendlyName: 'Get current user',
  description: 'Get the GitHub profile data for a user by access token.',
  cacheable: true,

  inputs: {
    accessToken: {
      description: 'A valid access token that can be used to access the GitHub api.',
      example: 'abdg27snhd72',
      required: true
    }
  },


  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Done.',
      example: {
        login: "octocat",
        id: 1,
        avatar_url: "https://github.com/images/error/octocat_happy.gif",
        gravatar_id: "",
        url: "https://api.github.com/users/octocat",
        html_url: "https://github.com/octocat",
        followers_url: "https://api.github.com/users/octocat/followers",
        following_url: "https://api.github.com/users/octocat/following{/other_user}",
        gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
        starred_url: "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
        organizations_url: "https://api.github.com/users/octocat/orgs",
        repos_url: "https://api.github.com/users/octocat/repos",
        events_url: "https://api.github.com/users/octocat/events{/privacy}",
        received_events_url: "https://api.github.com/users/octocat/received_events",
        type: "User",
        site_admin: false,
        name: "monalisa octocat",
        company: "GitHub",
        blog: "https://github.com/blog",
        location: "San Francisco",
        email: "octocat@github.com",
        hireable: false,
        bio: "There once was...",
        public_repos: 2,
        public_gists: 1,
        followers: 20,
        following: 0,
        created_at: "2008-01-14T04:33:35Z",
        updated_at: "2008-01-14T04:33:35Z"
      }
    }
  },

  fn: function(inputs, exits) {

    var Http = require('machinepack-http');

    // Send an HTTP request and receive the response.
    Http.sendHttpRequest({
      baseUrl: 'https://api.github.com',
      url: '/user',
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'token ' + inputs.accessToken,
        'User-Agent': 'MachinePack'
      },
    }).exec({

      success: function(response) {
        // Parse data from the response body
        try {
          var data = JSON.parse(response.body);
          return exits.success(data);
        }
        catch (e) {
          return exits.error(e);
        }

      },

      error: function(err) {
        return exits.error(err);
      }
    });
  }

};
