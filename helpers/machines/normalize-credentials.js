module.exports = {


  friendlyName: 'Normalize credentials',


  description: 'Build a proper set of authentication headers given one of a few different types of credentials.',


  extendedDescription: 'There are three different types of credentials that may be provided: `password`, `accessToken`, or `clientSecret`.  If `password` is used, a `username` must also be provided.  If `clientSecret` is used, then `clientId` must also be provided.',


  cacheable: true,


  sync: true,


  inputs: {

    credentialType: {
      description: 'The type of credentials being provided.',
      example: 'password',
      enum: ['password', 'accessToken', 'clientSecret'],
    },

    username: {
      description: 'Your GitHub username (to accompany your "password")',
      example: 'mikermcneil',
      relevantWhen: [{ credentialType: 'password' }]
    },

    password: {
      description: 'Your GitHub password (to authenticate with)',
      example: 'l0lcatzz',
      protect: true,
      relevantWhen: [{ credentialType: 'password' }]
    },

    accessToken: {
      description: 'A valid access token that can be used to access the GitHub api.',
      example: '91b0dea491ef41920e8a1bb301',
      protect: true,
      relevantWhen: [{ credentialType: 'accessToken' }]
    },

    clientId: {
      description: 'Your GitHub "client id" (to accompany your "client secret")',
      example: '?????????????????',
      relevantWhen: [{ credentialType: 'clientSecret' }]
    },

    clientSecret: {
      description: 'Your GitHub "client secret" (to authenticate with)',
      example: '?????????????????',
      protect: true,
      relevantWhen: [{ credentialType: 'clientSecret' }]
    }

  },


  exits: {

    success: {
      outputDescription: 'A set of ready-to-use authentication request headers and parameters.',
      variableName: 'credentials',
      example: {
        headers: {},
        params: {}
      }
    },

  },


  fn: function (inputs,exits) {
    var _ = require('lodash');

    var normalizedCreds = {
      headers: {
        'User-Agent': 'machinepack-github',
        'Accept': 'application/json',
      }
    };

    // If `credentialType` was left unspecified, infer it.
    if (_.isUndefined(inputs.credentialType)) {
      if (inputs.password && inputs.username) {
        inputs.credentialType = 'password';
      }
      else if (inputs.accessToken) {
        inputs.credentialType = 'accessToken';
      }
      else if (inputs.clientId && inputs.clientSecret) {
        inputs.credentialType = 'clientSecret';
      }
      // If nothing was provided, just bail out with no parameters
      // and only the boilerplate headers (e.g. "user-agent", "accept")
      else {
        return exits.success(normalizedCreds);
      }
    }

    switch (inputs.credentialType) {

      case 'password':
        if (!inputs.username || !inputs.password) {
          return exits.error(new Error('Username and password are both required to authenticate using a `password` (basic auth).'));
        }
        return exits.success(
          _.merge(normalizedCreds, {
            headers: {
              authorization: 'Basic '+ (new Buffer(inputs.username + ':' + inputs.password, 'ascii').toString('base64')),
            },
          })
        );

      case 'accessToken':
        if (!inputs.accessToken) {
          return exits.error(new Error('An `accessToken` is required to authenticate using an `accessToken`.'));
        }
        return exits.success(
          _.merge(normalizedCreds, {
            params: {
              access_token: inputs.accessToken
            },
            headers: {
              authorization: 'token '+inputs.accessToken
            }
          })
        );

      case 'clientSecret':
        if (!inputs.clientId || !inputs.clientSecret) {
          return exits.error(new Error('`clientId` and `clientSecret` are both required to authenticate using a `clientSecret`.'));
        }
        return exits.success(
          _.merge(normalizedCreds, {
            params: {
              client_id: inputs.clientId,
              client_secret: inputs.clientSecret,
            }
          })
        );

      default:
        return exits.error(new Error('Unrecognized `credentialType` ('+inputs.credentialType+')'));
    }

  }

};

