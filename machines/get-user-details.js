module.exports = {

  friendlyName: 'Get user details',
  description: 'Get the GitHub profile data for a user.',
  cacheable: true,

  inputs: {
    user: {
      description: 'The user or organization to look up (i.e. as it appears in the URL on GitHub)',
      example: 'mikermcneil',
      required: true
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Done.',
      example: {
        username: 'mikermcneil',
        isOrganization: false,
        name: 'Mike McNeil',
        email: 'customers@balderdash.co',
        avatarUrl: 'https://avatars.githubusercontent.com/u/618009?v=3',
        blogUrl: 'http://balderdash.co',
        githubProfileUrl: 'https://github.com/mikermcneil',
        location: 'Austin, TX',
        company: 'Balderdash',
        bio: '',
        numFollowers: 437,
        numPublicRepos: 82,
        numPublicGists: 122,
        isHireable: true
      }
    }
  },

  fn: function(inputs, exits) {

    // Dependencies
    var _ = require('lodash');
    var Github = require('github');

    var github = new Github({
      version: '3.0.0',
    });

    // http://mikedeboer.github.io/node-github/#user.prototype.get
    github.user.getFrom({
      user: inputs.user
    }, function(err, data) {
      if (err) return exits.error(err);

      // Marshal data into nicer format
      var userProfile = {};
      try {

        // Basic info
        userProfile.username = data.login;
        userProfile.isOrganization = !!data.type.match(/organization/i);
        userProfile.name = data.name;
        userProfile.email = data.email;
        userProfile.avatarUrl = data.avatar_url;

        // Details
        userProfile.blogUrl = data.blog;
        userProfile.githubProfileUrl = data.html_url;
        userProfile.location = data.location;
        userProfile.company = data.company;
        userProfile.bio = data.bio;
        userProfile.numFollowers = data.followers;
        userProfile.numPublicRepos = data.public_repos;
        userProfile.numPublicGists = data.public_gists;
        userProfile.isHireable = !!data.hireable;
      }
      catch (e){
        return exits.error(e);
      }

      return exits.success(userProfile);
    });
  }

};



// RAW:

// Org
  //  { login: 'balderdashy',
  // id: 1445252,
  // avatar_url: 'https://avatars.githubusercontent.com/u/1445252?v=3',
  // gravatar_id: '',
  // url: 'https://api.github.com/users/balderdashy',
  // html_url: 'https://github.com/balderdashy',
  // followers_url: 'https://api.github.com/users/balderdashy/followers',
  // following_url: 'https://api.github.com/users/balderdashy/following{/other_user}',
  // gists_url: 'https://api.github.com/users/balderdashy/gists{/gist_id}',
  // starred_url: 'https://api.github.com/users/balderdashy/starred{/owner}{/repo}',
  // subscriptions_url: 'https://api.github.com/users/balderdashy/subscriptions',
  // organizations_url: 'https://api.github.com/users/balderdashy/orgs',
  // repos_url: 'https://api.github.com/users/balderdashy/repos',
  // events_url: 'https://api.github.com/users/balderdashy/events{/privacy}',
  // received_events_url: 'https://api.github.com/users/balderdashy/received_events',
  // type: 'Organization',
  // site_admin: false,
  // name: 'Balderdash',
  // company: null,
  // blog: 'http://balderdash.co',
  // location: 'Austin, TX',
  // email: 'friends@balderdash.co',
  // hireable: null,
  // bio: null,
  // public_repos: 101,
  // public_gists: 0,
  // followers: 0,
  // following: 0,
  // created_at: '2012-02-17T02:24:38Z',
  // updated_at: '2014-12-29T15:44:11Z',
  // meta:
  //  { 'x-ratelimit-limit': '60',
  //    'x-ratelimit-remaining': '57',
  //    'last-modified': 'Mon, 29 Dec 2014 15:44:11 GMT',
  //    etag: '"16cb1597d76becf5e981ef2f4029dd77"',
  //    status: '200 OK' } }


// User
  //  { login: 'mikermcneil',
  // id: 618009,
  // avatar_url: 'https://avatars.githubusercontent.com/u/618009?v=3',
  // gravatar_id: '',
  // url: 'https://api.github.com/users/mikermcneil',
  // html_url: 'https://github.com/mikermcneil',
  // followers_url: 'https://api.github.com/users/mikermcneil/followers',
  // following_url: 'https://api.github.com/users/mikermcneil/following{/other_user}',
  // gists_url: 'https://api.github.com/users/mikermcneil/gists{/gist_id}',
  // starred_url: 'https://api.github.com/users/mikermcneil/starred{/owner}{/repo}',
  // subscriptions_url: 'https://api.github.com/users/mikermcneil/subscriptions',
  // organizations_url: 'https://api.github.com/users/mikermcneil/orgs',
  // repos_url: 'https://api.github.com/users/mikermcneil/repos',
  // events_url: 'https://api.github.com/users/mikermcneil/events{/privacy}',
  // received_events_url: 'https://api.github.com/users/mikermcneil/received_events',
  // type: 'User',
  // site_admin: false,
  // name: 'Mike McNeil',
  // company: 'Balderdash',
  // blog: 'http://balderdash.co',
  // location: 'Austin, TX',
  // email: 'customers@balderdash.co',
  // hireable: true,
  // bio: null,
  // public_repos: 82,
  // public_gists: 122,
  // followers: 437,
  // following: 171,
  // created_at: '2011-02-14T20:51:12Z',
  // updated_at: '2014-12-29T14:55:58Z',
  // meta:
  //  { 'x-ratelimit-limit': '60',
  //    'x-ratelimit-remaining': '55',
  //    'last-modified': 'Mon, 29 Dec 2014 14:55:58 GMT',
  //    etag: '"b043bfd3e235e1128435ebf3bb741fb2"',
  //    status: '200 OK' } }

