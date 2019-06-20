const _ = require('underscore')
const getStore = async (z, bundle) => {
  try {
    let response = await z.request({
      url: 'https://ssapi.shipstation.com/stores',
      params: {
        sortBy: 'modifyDate',
        sortDir: 'DESC'
      }
    })
    let stores = await response.json
    stores = _.map(stores, (store) => {
      store.id = store.storeId
      delete store.storeId
      return store
    })
    return stores
  } catch (e) {
    throw new Error((e.message))
  }
}

module.exports = {
  key: 'stores',
  noun: 'store ',

  display: {
    label: 'Get Stores',
    description: 'Triggers on updated order',
    hidden: true
  },

  operation: {
    inputFields: [],
    perform: getStore,
    sample:
    {
      'id': 987654321
    }
  }

}
