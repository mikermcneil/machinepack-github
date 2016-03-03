module.exports = {


  friendlyName: 'Send GitHub API request',


  description: 'Send a request to the GitHub API.',


  extendedDescription: 'This subroutine takes care of normalizing and formatting credentials, if provided.',


  inputs: {

    method: {
      description: 'The HTTP method (aka "verb") for the request.',
      example: 'get',
      required: true
    },

    url: {
      description: 'The relative URL for this GitHub API endpoint.',
      example: '/search/issues',
      required: true
    },

    params: {
      description: 'Parameters to send in the request.',
      extendedDescription: 'Any parameters necessary for authentication will be inferred from the provided credentials and folded in automatically.  If this is a request without a body (e.g. a GET request), the parameters will be encoded into the query string.  Otherwise, they will go in the HTTP request body.',
      example: {},
      defaultsTo: {}
    },

    body: {
      description: 'Body of the request to send (for PUT or POST requests).',
      example: '*',
    },

    headers: {
      description: 'Headers to send in the request.',
      extendedDescription: 'Any headers necessary for authentication will be inferred from the provided credentials and folded in automatically.',
      example: {},
      defaultsTo: {}
    },

    // Credentials are optional
    credentials: require('../../structs/credentials.optional-input'),

  },


  exits: {

    success: {
      outputDescription: 'The decoded response from the GitHub API.',
      variableName: 'apiResponse',
      example: {
        status: 200,
        headers: {},
        body: '*'
      }
    },

  },


  fn: function (inputs,exits) {
    var _ = require('lodash');
    var Http = require('machinepack-http');
    var Helpers = require('../');

    // Normalize credentials, if any were provided.
    inputs.credentials = Helpers.normalizeCredentials(inputs.credentials).execSync();

    // Ensure "Accept" and "User-agent" headers exist.
    inputs.credentials.headers['Accept'] = inputs.credentials.headers['Accept'] || 'application/json';
    inputs.credentials.headers['User-Agent'] = inputs.credentials.headers['User-Agent'] || 'machinepack-github';

    // Send API request
    Http.sendHttpRequest({
      baseUrl: 'https://api.github.com',
      url: inputs.url,
      method: inputs.method,
      params: _.merge(inputs.credentials.params, inputs.params),
      body: inputs.body,
      headers: _.merge(inputs.credentials.headers, inputs.headers),
    }).exec({

      error: function(err) {
        return exits.error(err);
      },

      success: function(httpResponse) {
        // Allow responses with no body
        if (httpResponse.body === '' || httpResponse.body === null) {
          return exits.success(httpResponse.body);
        }
        try {
          // Parse data from the response body
          httpResponse.body = JSON.parse(httpResponse.body);
          return exits.success(httpResponse);
        }
        catch (e){
          // Could not parse response body as JSON.
          return exits.error(e);
        }
      }
    });

  }

};

