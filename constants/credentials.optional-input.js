module.exports = {
  description: 'Your GitHub credentials.',
  extendedDescription: 'The expected type of this input varies based on the _type_ of credentials. '+
  'You should specify a `credentialType` (either "password", "accessToken", or "clientSecret"), '+
  'as well as the appropriate metadata. '+
  'If using "password", specify a "username" and "password" properties. '+
  'If using "accessToken", specify an "accessToken" property. '+
  'If using "clientSecret", specify "clientId" and "clientSecret" properties.',
  example: {},
  protect: true
};
