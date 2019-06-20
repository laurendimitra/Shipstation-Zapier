const MarkasshippedCreate = require('./creates/mark_as_shipped');
const StoreTrigger = require('./triggers/store');
const updatedContact = require('./triggers/updated_order');
const CreateupdateOrder = require('./creates/create_update_order');
const authentication = require('./authentication');

const addAuthToHeader = (request, z, bundle) => {
  const basicHash = Buffer(`${bundle.authData.api_key}:${bundle.authData.api_secret}`).toString('base64');
  request.headers.Authorization = `Basic ${basicHash}`;
  request.headers['Accept'] = 'application/json';
  request.headers['Content-Type'] = 'application/json';
  return request;
};

const mustBe200 = (response, z, bundle) => {
  if (response.status !== 200) {
    throw new Error(`Unexpected status code ${response.status}`);
  }
  return response;
};

// Now we can roll up all our behaviors in an App.
const App = {

  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication,
  beforeRequest: [addAuthToHeader],
  

  afterResponse: [mustBe200],

  resources: {},

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [StoreTrigger.key]: StoreTrigger,
    [updatedContact.key]: updatedContact
  },

  // If you want your searches to show up, you better include it here!
  searches: {},

  // If you want your creates to show up, you better include it here!
  creates: {
    [MarkasshippedCreate.key]: MarkasshippedCreate,
    [CreateupdateOrder.key]: CreateupdateOrder
  }
};

// Finally, export the app.
module.exports = App;
