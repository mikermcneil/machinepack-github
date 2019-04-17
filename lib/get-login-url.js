module.exports = {

  friendlyName: 'Get GitHub login URL',
  description: 'Get the URL on github.com that a user should visit to authorize the specified GitHub app (i.e. your app).',
  extendedDescription: 'This is the URL where you typically redirect a user in order for them to grant access to your GitHub app.',
  sideEffects: 'cacheable',

  inputs: {
    clientId: {
      example: 'abc123jdhs3h4js',
      description: 'The unique identifier for your GitHub app. It\'s listed on the application settings page.',
      required: true
    },
    callbackUrl: {
      example: 'http://my-cool-app.com/auth/callback',
      description: 'The URL in your app where users will be sent after authorization.',
      required: true
    },
    scope: {
      example: ['public_repo'],
      description: 'A comma separated list of scopes requested for the authorization.'
    }
  },

  exits: {
    error: {
      description: 'Triggered when the GitHub API returns an error (i.e. a non-2xx status code)'
    },
    success: {
      outputExample: 'https://github.com/login/oauth/authorize?client_id=215798311808508&redirect_uri=http://localhost:1337/auth/authorize&scope=email,friends'
    }
  },

  fn: function (inputs, exits) {

    var util = require('util');
    var url = 'https://github.com/login/oauth/authorize';
    inputs.scope = inputs.scope || [];

    // Generate a semi-random string to use for the state
    var state = (Math.random() + 1).toString(36).substring(7);

    try {
      return exits.success(util.format(
        'https://github.com/login/oauth/authorize?client_id=%s&redirect_uri=%s&scope=%s&state=%s',
        inputs.clientId, inputs.callbackUrl, inputs.scope.join(','), state
      ));
    }
    catch(e) {
      return exits.error(e);
    }
  }
};
