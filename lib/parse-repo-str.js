module.exports = {


  friendlyName: 'Parse repo string',


  description: 'Parse a repo string (e.g. \'/node-machine/machine\')',


  cacheable: true,


  sync: true,


  inputs: {

    string: {
      friendlyName: 'Repo string',
      description: 'The repo string to parse',
      example: '/node-machine/machine#master',
      required: true
    }

  },


  exits: {

    success: {
      variableName: 'result',
      example: {
        owner: 'node-machine',
        repo: 'machine',
        branch: 'master'
      },
      description: 'Done.',
    },

  },


  fn: function (inputs,exits) {
    var _ = require('@sailshq/lodash');

    inputs.string = _.trimLeft(inputs.string, '/');
    var owner = inputs.string.split('/')[0];
    var name = inputs.string.split('/')[1];
    var branch = 'master';

    if (~name.indexOf('#')) {
      branch = name.split('#')[1];
      name = name.split('#')[0];
    }

    return exits.success({
      owner: owner,
      repo: name,
      branch: branch
    });
  },



};
