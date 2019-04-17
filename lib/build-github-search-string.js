module.exports = {


  friendlyName: 'Build GitHub search string',


  description: 'Build a GitHub search string (the \'q\' parameter for use with the GitHub Search API).',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    repo: {
      description: 'The name of the Github repo (i.e. as it appears in the URL on GitHub)',
      example: 'sails'
    },

    owner: {
      description: 'The name of the organization or user that owns the repo (i.e. as it appears in the URL on GitHub)',
      example: 'balderdashy'
    },

    state: {
      description: 'The state to filter issues by (either "open" or "closed".',
      example: 'open',
    },

    lastUpdatedBefore: {
      description: 'A JS timestamp.',
      extendedDescription: 'Issues that have been updated _since_ this timestamp will be excluded from the results.',
      example: 1442710858715
    },

    withAllOfTheseLabels: {
      description: 'A set of issue labels.',
      extendedDescription: 'Issues that include _all_ of these labels will be included in search results.',
      example: ['question']
    },

    withNoneOfTheseLabels: {
      description: 'A set of issue labels.',
      extendedDescription: 'Issues that include _none_ of these labels will be included in search results.',
      example: ['bug']
    },

    type: {
      description: 'The type of issues to return (either `pr` or `issue).',
      extendedDescription: 'If omitted, both types of issues will be searched.',
      example: 'pr'
    }

  },


  exits: {

    success: {
      variableName: 'githubSearchStr',
      outputExample: 'repo:balderdashy/sails state:open'
    },

  },


  fn: function (inputs,exits) {
    var util = require('util');
    var _ = require('@sailshq/lodash');
    var Datetime = require('machinepack-datetime');

    // The local variable `q` will be used to build up the search string
    // iteratively in the code below.  We'll start by building it as an
    // array of strings, then mash it together at the end using `.join()`.
    var q = [];

    // Filter on owner+repo
    if (inputs.owner && inputs.repo) {
      q.push( util.format( 'repo:%s/%s', inputs.owner, inputs.repo) );
    }
    // or just owner
    else if (inputs.owner) {
      q.push( util.format( 'user:%s', inputs.owner) );
    }

    // Filter on labels (only include issue if it has _all_ of these labels)
    if (!_.isUndefined(inputs.withAllOfTheseLabels)) {
      q.push(
        _.map(inputs.withAllOfTheseLabels, (labelName)=>{
          return 'label:"'+labelName+'"'; // << use double quotes to support labels with whitespace (see https://github.com/isaacs/github/issues/65#issuecomment-63971607)
        })
        .join(' ')
      );
    }

    // Filter on labels (only include issue if it has _none_ of these labels)
    if (!_.isUndefined(inputs.withNoneOfTheseLabels)) {
      q.push(
        _.map(inputs.withNoneOfTheseLabels, (labelName)=>{
          return '-label:"'+labelName+'"'; // << use double quotes to support labels with whitespace (see https://github.com/isaacs/github/issues/65#issuecomment-63971607)
        })
        .join(' ')
      );
    }

    // Filter on issue state (open vs. closed)
    if (!_.isUndefined(inputs.state)) {
      q.push( 'state:'+inputs.state );
    }

    // Filter on issue type (pr vs. issue)
    if (!_.isUndefined(inputs.type)) {
      q.push( 'type:'+inputs.type );
    }

    // Filter issues based on when they were last updated.
    if (!_.isUndefined(inputs.lastUpdatedBefore)) {
      var dateInstance = Datetime.parseTimestamp({
        timestamp: inputs.lastUpdatedBefore,
        timezone: 'America/Chicago'
      }).execSync();
      var formattedDateStr = util.format('%s-%s-%s',
        dateInstance.year,
        (dateInstance.month<10?'0':'')+dateInstance.month,
        (dateInstance.date<10?'0':'')+dateInstance.date
      );
      q.push( 'updated:<'+formattedDateStr );
    }

    // Now smash the strings together, separating them w/ spaces...
    q = q.join(' ');

    // and we're done!
    return exits.success(q);
  },



};
