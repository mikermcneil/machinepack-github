module.exports = {

  friendlyName: 'Get repo',
  description: 'Fetch metadata about a repository on GitHub.',
  cacheable: true,

  inputs: {
    repo: {
      description: 'The name of the Github repo (i.e. as it appears in the URL on GitHub)',
      example: 'sails',
      required: true
    },
    user: {
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
      example: {
        "id": 3757512,
        "name": "sails",
        "full_name": "balderdashy/sails",
        "owner": {
          "login": "balderdashy",
          "id": 1445252,
          "avatar_url": "https://avatars.githubusercontent.com/u/1445252?",
          "gravatar_id": "8590af9cb2eed44f7b66fed322704aeb",
          "url": "https://api.github.com/users/balderdashy",
          "html_url": "https://github.com/balderdashy",
          "followers_url": "https://api.github.com/users/balderdashy/followers",
          "following_url": "https://api.github.com/users/balderdashy/following{/other_user}",
          "gists_url": "https://api.github.com/users/balderdashy/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/balderdashy/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/balderdashy/subscriptions",
          "organizations_url": "https://api.github.com/users/balderdashy/orgs",
          "repos_url": "https://api.github.com/users/balderdashy/repos",
          "events_url": "https://api.github.com/users/balderdashy/events{/privacy}",
          "received_events_url": "https://api.github.com/users/balderdashy/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/balderdashy/sails",
        "description": "Realtime MVC Framework for Node.js",
        "fork": false,
        "url": "https://api.github.com/repos/balderdashy/sails",
        "forks_url": "https://api.github.com/repos/balderdashy/sails/forks",
        "keys_url": "https://api.github.com/repos/balderdashy/sails/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/balderdashy/sails/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/balderdashy/sails/teams",
        "hooks_url": "https://api.github.com/repos/balderdashy/sails/hooks",
        "issue_events_url": "https://api.github.com/repos/balderdashy/sails/issues/events{/number}",
        "events_url": "https://api.github.com/repos/balderdashy/sails/events",
        "assignees_url": "https://api.github.com/repos/balderdashy/sails/assignees{/user}",
        "branches_url": "https://api.github.com/repos/balderdashy/sails/branches{/branch}",
        "tags_url": "https://api.github.com/repos/balderdashy/sails/tags",
        "blobs_url": "https://api.github.com/repos/balderdashy/sails/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/balderdashy/sails/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/balderdashy/sails/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/balderdashy/sails/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/balderdashy/sails/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/balderdashy/sails/languages",
        "stargazers_url": "https://api.github.com/repos/balderdashy/sails/stargazers",
        "contributors_url": "https://api.github.com/repos/balderdashy/sails/contributors",
        "subscribers_url": "https://api.github.com/repos/balderdashy/sails/subscribers",
        "subscription_url": "https://api.github.com/repos/balderdashy/sails/subscription",
        "commits_url": "https://api.github.com/repos/balderdashy/sails/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/balderdashy/sails/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/balderdashy/sails/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/balderdashy/sails/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/balderdashy/sails/contents/{+path}",
        "compare_url": "https://api.github.com/repos/balderdashy/sails/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/balderdashy/sails/merges",
        "archive_url": "https://api.github.com/repos/balderdashy/sails/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/balderdashy/sails/downloads",
        "issues_url": "https://api.github.com/repos/balderdashy/sails/issues{/number}",
        "pulls_url": "https://api.github.com/repos/balderdashy/sails/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/balderdashy/sails/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/balderdashy/sails/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/balderdashy/sails/labels{/name}",
        "releases_url": "https://api.github.com/repos/balderdashy/sails/releases{/id}",
        "created_at": "2012-03-18T19:46:15Z",
        "updated_at": "2014-05-16T19:15:35Z",
        "pushed_at": "2014-05-15T17:43:12Z",
        "git_url": "git://github.com/balderdashy/sails.git",
        "ssh_url": "git@github.com:balderdashy/sails.git",
        "clone_url": "https://github.com/balderdashy/sails.git",
        "svn_url": "https://github.com/balderdashy/sails",
        "homepage": "http://sailsjs.org",
        "size": 28470,
        "stargazers_count": 6212,
        "watchers_count": 6212,
        "language": "JavaScript",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": false,
        "forks_count": 697,
        "mirror_url": null,
        "open_issues_count": 109,
        "forks": 697,
        "open_issues": 109,
        "watchers": 6212,
        "default_branch": "master",
        "master_branch": "master",
        "organization": {
          "login": "balderdashy",
          "id": 1445252,
          "avatar_url": "https://avatars.githubusercontent.com/u/1445252?",
          "gravatar_id": "8590af9cb2eed44f7b66fed322704aeb",
          "url": "https://api.github.com/users/balderdashy",
          "html_url": "https://github.com/balderdashy",
          "followers_url": "https://api.github.com/users/balderdashy/followers",
          "following_url": "https://api.github.com/users/balderdashy/following{/other_user}",
          "gists_url": "https://api.github.com/users/balderdashy/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/balderdashy/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/balderdashy/subscriptions",
          "organizations_url": "https://api.github.com/users/balderdashy/orgs",
          "repos_url": "https://api.github.com/users/balderdashy/repos",
          "events_url": "https://api.github.com/users/balderdashy/events{/privacy}",
          "received_events_url": "https://api.github.com/users/balderdashy/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "network_count": 697,
        "subscribers_count": 559,
        "meta": {
          "x-ratelimit-limit": "60",
          "x-ratelimit-remaining": "56",
          "last-modified": "Fri, 16 May 2014 19:15:35 GMT",
          "etag": "\"e839eeae9eb0c5cafd84175f29d4ce94\"",
          "status": "200 OK"
        }
      }
    }
  },

  fn: function(inputs, exits) {
    var Github = require('github');

    try {
      var github = new Github({
        version: '3.0.0',
      });

      github.repos.get({
        repo: inputs.repo,
        user: inputs.user
      }, function(err, data) {
        if (err) return exits(err);
        else return exits.success(data);
      });
    }
    catch (e) {
      return exits.error(e);
    }
  }

};
