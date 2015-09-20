module.exports = {


  friendlyName: 'Search issues',


  description: 'List GitHub issues matching the specified criteria.',


  cacheable: true,


  inputs: {

    username: {
      description: 'Your GitHub username (to authenticate with)',
      example: 'mikermcneil',
      required: true
    },

    password: {
      description: 'Your GitHub password (to authenticate with)',
      example: 'l0lcatzz',
      required: true,
      protect: true
    },

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
    var util = require('util');
    var _ = require('lodash');
    var Datetime = require('machinepack-datetime');
    var Http = require('machinepack-http');

    // Build GitHub search string
    var githubSearchStr = (function _buildGithubSearchStr(){
      var q = '';

      // Filter on owner+repo
      q += util.format(' repo:%s/%s', inputs.owner, inputs.repo);

      // Filter on issue state (open vs. closed)
      if (!_.isUndefined(inputs.state)) {
        q += ' state:'+inputs.state;
      }

      // Filter issues based on when they were last updated
      if (!_.isUndefined(inputs.lastUpdatedBefore)) {
        (function _buildLastUpdatedBefore(){
          var dateInstance = Datetime.parseTimestamp({
            timestamp: inputs.lastUpdatedBefore,
            timezone: 'America/Chicago'
          }).execSync();
          var formattedDateStr = util.format('%s-%s-%s',
            dateInstance.year,
            (dateInstance.month<10?'0':'')+dateInstance.month,
            (dateInstance.date<10?'0':'')+dateInstance.date
          );
          q += ' updated:<'+formattedDateStr;
        })();
      }

      // Trim off extra whitespace, and we're done!
      return _.trim(q);
    })();

    // Search issues
    Http.sendHttpRequest({
      // See https://developer.github.com/v3/search/#search-issues
      baseUrl: 'https://api.github.com',
      url: '/search/issues',
      method: 'get',
      params: {
        q: githubSearchStr,
        order: 'asc',
        sort: 'updated',
        per_page: 100,
      },
      headers: {
        'authorization': 'Basic ' + (new Buffer(inputs.username + ':' + inputs.password, 'ascii').toString('base64')),
        'User-Agent': 'machinepack-github',
      },
    }).exec({

      error: function(err) {
        return exits.error(err);
      },

      success: function(httpResponse) {
        try {
          // Parse data from the response body
          var responseData = JSON.parse(httpResponse.body);

          // TODO: get multiple pages if necessary
          return exits.success(responseData.items);
        }
        catch (e){
          return exits.error(e);
        }
      }
    });
  },



};
