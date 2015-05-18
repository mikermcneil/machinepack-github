module.exports = {


  friendlyName: 'Get download URL',


  description: 'Build the URL to download a specific release/branch .zip file for a particular repo.',


  cacheable: true,


  sync: true,


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

    branch: {
      description: 'The branch of the repo that will be downloaded.',
      example: 'master',
      defaultsTo: 'master'
    }

  },


  exits: {

    success: {
      variableName: 'result',
      description: 'Done.',
    },

  },


  fn: function (inputs,exits) {
    return exits.success('https://github.com/' + inputs.owner + '/' + inputs.repo + '/archive/' + inputs.branch + '.zip');
  },



};
