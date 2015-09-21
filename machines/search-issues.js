module.exports = {


  friendlyName: 'Search issues',


  description: 'List GitHub issues matching the specified criteria.',


  cacheable: true,


  inputs: {

    // Credentials are optional
    credentials: require('../structs/credentials.optional-input'),

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

    state: {
      description: 'The state to filter issues by (either "open" or "closed".',
      example: 'open',
    },

    lastUpdatedBefore: {
      description: 'A JS timestamp.',
      extendedDescription: 'Issues that have been updated _since_ this timestamp will be excluded from the results.',
      example: 1442710858715
    }

  },


  exits: {

    success: {
      variableName: 'issues',
      example: [{
        id: 83393186,
        url: 'https://api.github.com/repos/balderdashy/sails/issues/2976',
        number: 2976,
        state: 'open',
        pull_request: '*',
        title: 'Error 500 on duplicate key found in database',
        body: 'How to catch the `error` occured while db find a duplicate key...',
        locked: false,
        assignee: '*',
        milestone: '*',
        comments: 2,
        created_at: '2015-06-01T08:52:02Z',
        updated_at: '2015-06-02T09:15:20Z',
        user: {
          id: 5616249,
          login: 'nikhiljohn10',
          avatar_url: 'https://avatars.githubusercontent.com/u/5616249?v=3',
          html_url: 'https://github.com/nikhiljohn10'
        },
        labels: [
          {
            url: 'https://api.github.com/repos/balderdashy/sails/labels/featurerequest',
            name: 'featurerequest',
            color: '16ACC2'
          }
        ]
      }]
    },

  },


  fn: function (inputs,exits) {
    var _ = require('lodash');
    var Helpers = require('../helpers');
    var thisPack = require('../');

    // Search issues
    Helpers.sendGithubApiRequest({

      method: 'get',

      url: '/search/issues',

      params: {
        // Set up sort order
        order: 'asc',
        sort: 'updated',
        // and pagination
        per_page: 100,
        // And build the GitHub search string
        q: thisPack.buildGithubSearchString({
          owner: inputs.owner,
          repo: inputs.repo,
          state: inputs.state,
          lastUpdatedBefore: inputs.lastUpdatedBefore,
        }).execSync(),
      },

      credentials: inputs.credentials

    }).exec({
      error: exits.error,
      success: function (apiResponse) {
        try {
          return exits.success(apiResponse.body.items);
        }
        catch (e) { return exits.error(e); }
      }
    });

  },

};
