module.exports = {


  friendlyName: 'Search issues',


  description: 'List GitHub issues matching the specified criteria.',


  cacheable: false,


  sync: false,


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
    }

  },


  exits: {

    success: {
      variableName: 'result',
      description: 'Done.',
    },

  },


  fn: function (inputs,exits) {
    var util = require('util');
    var _ = require('lodash');
    var Datetime = require('machinepack-datetime');
    var Http = require('machinepack-http');

    // Format date (two months ago ==>   -5184000000ms)
    var twoMonthsAgo = Datetime.parseTimestamp({
      timestamp: (new Date()).getTime() - 5184000000,
      timezone: 'America/Chicago'
    }).execSync();

    // Search issues
    Http.sendHttpRequest({
      // See https://developer.github.com/v3/search/#search-issues
      baseUrl: 'https://api.github.com',
      url: '/search/issues',
      method: 'get',
      params: {
        q: util.format(
          'repo:%s/%s '+
          'state:open '+
          'updated:<%s',
          inputs.owner,
          inputs.repo,
          twoMonthsAgo.year+'-'+(twoMonthsAgo.month<10?'0'+twoMonthsAgo.month:twoMonthsAgo.month)+'-'+twoMonthsAgo.date
        ),
        order: 'asc',
        sort: 'updated',
        per_page: 100,
      },
      headers: {
        'authorization': 'Basic ' + (new Buffer(inputs.username + ':' + inputs.password, 'ascii').toString('base64')),
        'User-Agent': 'Cat-o-Nine Bot',
      },
    }).exec({
      error: function(err) {
        return exits.error(err);
      },

      success: function(response) {
        // Parse data from the response body
        var issues;
        try {
          issues = JSON.parse(response.body).items;
        }
        catch (e){
          return exits.error(e);
        }
        console.log(issues.length);
        return exits.success(issues);
      }
    });
  },



};
