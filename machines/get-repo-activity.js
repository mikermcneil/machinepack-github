module.exports = {

  friendlyName: 'Get repo activity',
  description: 'Fetch activity in a github repo.',
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
      example: {
        "message": "Not Found",
        "documentation_url": "https://developer.github.com/v3"
      }
    },
    success: {
      example: [{
        "id": "2100840605",
        "type": "IssuesEvent",
        "actor": {
          "id": 618009,
          "login": "mikermcneil",
          "gravatar_id": "199046437b76e6ca73e00b4cc182a1c5",
          "url": "https://api.github.com/users/mikermcneil",
          "avatar_url": "https://avatars.githubusercontent.com/u/618009?"
        },
        "repo": {
          "id": 3757512,
          "name": "balderdashy/sails",
          "url": "https://api.github.com/repos/balderdashy/sails"
        },
        "payload": {
          "action": "closed",
          "issue": {
            "url": "https://api.github.com/repos/balderdashy/sails/issues/1702",
            "labels_url": "https://api.github.com/repos/balderdashy/sails/issues/1702/labels{/name}",
            "comments_url": "https://api.github.com/repos/balderdashy/sails/issues/1702/comments",
            "events_url": "https://api.github.com/repos/balderdashy/sails/issues/1702/events",
            "html_url": "https://github.com/balderdashy/sails/issues/1702",
            "id": 33589919,
            "number": 1702,
            "title": "baseUrl doesn't trust Host header",
            "user": {
              "login": "adamhooper",
              "id": 10812,
              "avatar_url": "https://avatars.githubusercontent.com/u/10812?",
              "gravatar_id": "933d8a04917ef38f905f2abe02d2bda9",
              "url": "https://api.github.com/users/adamhooper",
              "html_url": "https://github.com/adamhooper",
              "followers_url": "https://api.github.com/users/adamhooper/followers",
              "following_url": "https://api.github.com/users/adamhooper/following{/other_user}",
              "gists_url": "https://api.github.com/users/adamhooper/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/adamhooper/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/adamhooper/subscriptions",
              "organizations_url": "https://api.github.com/users/adamhooper/orgs",
              "repos_url": "https://api.github.com/users/adamhooper/repos",
              "events_url": "https://api.github.com/users/adamhooper/events{/privacy}",
              "received_events_url": "https://api.github.com/users/adamhooper/received_events",
              "type": "User",
              "site_admin": false
            },
            "labels": [],
            "state": "closed",
            "assignee": null,
            "milestone": null,
            "comments": 1,
            "created_at": "2014-05-15T14:23:58Z",
            "updated_at": "2014-05-15T17:43:12Z",
            "closed_at": "2014-05-15T17:43:12Z",
            "body": "A bug was introduced in #1587.\r\n\r\nThe HTTP Host header already includes the port [http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.23], and there is no such thing as a Port header. Therefore Sails doesn't work behind properly-configured proxies: it only works behind misconfigured ones.\r\n\r\nThe solution is to use the actual HTTP Host header, which -- unfortunately -- Express truncates. A simple copy/paste from Express' `request.js` will give the host and port, straight from a valid HTTP request:\r\n\r\n```javascript\r\n  var trustProxy = req.app.get('trust proxy');\r\n  var host = trustProxy && req.get('X-Forwarded-Host');\r\n  host = host || req.get('Host');\r\n\r\n  req.baseUrl = req.protocol + \"://\" + host;\r\n```\r\n\r\nWith this change, the developer need only enable `trust proxy` to work behind any HTTP-compliant reverse proxy."
          }
        },
        "public": true,
        "created_at": "2014-05-15T17:43:12Z",
        "org": {
          "id": 1445252,
          "login": "balderdashy",
          "gravatar_id": "8590af9cb2eed44f7b66fed322704aeb",
          "url": "https://api.github.com/orgs/balderdashy",
          "avatar_url": "https://avatars.githubusercontent.com/u/1445252?"
        }
      }]
    }
  },

  fn: function(inputs, exits) {

    var Github = require('github');

    try {
      var github = new Github({
        version: '3.0.0'
      });

      github.events.getFromRepo({
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
