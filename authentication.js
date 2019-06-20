module.exports = {
  type: 'custom',
  // "test" could also be a function
  test: {
    url:
      'https://ssapi.shipstation.com/customers'
  },
  fields: [
    {
      key: 'api_key',
      label: 'API Key',
      type: 'string',
      required: true,
      helpText: 'Found at https://ss9.shipstation.com/#/settings/api'
    },
    {
      key: 'api_secret',
      label: 'API Secret',
      type: 'string',
      required: true,
      helpText: 'Found at https://ss9.shipstation.com/#/settings/api'
    }
  ]
}
