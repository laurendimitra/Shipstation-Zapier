const _ = require('underscore')
// convert incomming date and oriderId to id in response
const createUpdateOrder = async(z, bundle) => {
  try {
    let body = bundle.inputData
    body = _.omit(body, 'update_create')
    let keys = _.allKeys(bundle.inputData)
    let billToKeys = _.filter(keys, key => {
      return (key.indexOf('billTo') > -1)
    })
    let shipToKeys = _.filter(keys, key => {
      return (key.indexOf('shipTo') > -1)
    })
    let dimensionsKeys = _.filter(keys, key => {
      return (key.indexOf('dimensions') > -1)
    })
    let insuranceOptionsKeys = _.filter(keys, key => {
      return (key.indexOf('insuranceOptions') > -1)
    })
    let internationalOptionsKeys = _.filter(keys, key => {
      return (key.indexOf('internationalOptions') > -1)
    })
    let advancedOptionsKeys = _.filter(keys, key => {
      return (key.indexOf('advancedOptions') > -1)
    })
    body.billTo = {}
    if (billToKeys.length > 0) {
      billToKeys.forEach(key => {
        body.billTo[key.split('billTo_')[1]] = body[key]
        delete body[key]
      })
    }
    body.shipTo = {}
    if (shipToKeys.length > 0) {
      shipToKeys.forEach(key => {
        body.shipTo[key.split('shipTo_')[1]] = body[key]
        delete body[key]
      })
    }
    if (dimensionsKeys.length > 0) {
      body.dimensions = {}
      dimensionsKeys.forEach(key => {
        body.dimensions[key.split('dimensions_')[1]] = body[key]
        delete body[key]
      })
    }
    if (insuranceOptionsKeys.length > 0) {
      body.insuranceOptions = {}
      insuranceOptionsKeys.forEach(key => {
        body.insuranceOptions[key.split('insuranceOptions_')[1]] = body[key]
        delete body[key]
      })
    }
    if (internationalOptionsKeys.length > 0) {
      body.internationalOptions = {}
      internationalOptionsKeys.forEach(key => {
        body.internationalOptions[key.split('internationalOptions_')[1]] = body[key]
        delete body[key]
      })
    }
    if (advancedOptionsKeys.length > 0) {
      body.advancedOptions = {}
      advancedOptionsKeys.forEach(key => {
        body.advancedOptions[key.split('advancedOptions_')[1]] = body[key]
        delete body[key]
      })
    }

    if (bundle.inputData.update_create === 'update' && !bundle.inputData.orderKey) {
      throw new Error('Order Key field is required to update')
    }

    let response = await z.request({
      url: 'https://ssapi.shipstation.com/orders/createorder',
      method: 'POST',
      json: body
    })
    return response
  }
  catch (e) {
    throw new Error((e.message))
  }
}

module.exports = {
  key: 'order',
  noun: 'order',

  display: {
    label: 'Update/Create Order',
    description: 'Creates or updates an order'
  },

  operation: {
    perform: createUpdateOrder,
    inputFields: [{
        key: 'update_create',
        choices: {
          update: 'Update',
          create: 'Create'
        },
        required: true
      },
      {
        key: 'orderNumber',
        label: 'Order Number',
        type: 'string',
        required: true
      },
      {
        key: 'advancedOptions_storeId',
        label: 'Store ID',
        type: 'number',
        dynamic: 'stores.id.storeName'
      },
      {
        key: 'orderKey',
        label: 'Order Key',
        type: 'string',
        helpText: 'User defined order key. Required for update'
      },
      {
        key: 'orderDate',
        label: 'Order Date',
        type: 'datetime',
        required: true
      },
      {
        key: 'orderStatus',
        label: 'Order Status',
        type: 'string',
        required: true,
        choices: {
          awaiting_shipment: 'awaiting_shipment',
          awaiting_payment: 'awaiting_payment',
          shipped: 'shipped',
          on_hole: 'on_hold',
          cancelled: 'cancelled'
        }
      },
      {
        key: 'shipTo_name',
        label: 'Ship To Name',
        type: 'string',
        required: false
      },
      {
        key: 'shipTo_company',
        label: 'Ship To Company',
        type: 'string',
        required: false
      },
      {
        key: 'shipTo_street1',
        label: 'Ship To Street 1',
        type: 'string',
        required: false
      },
      {
        key: 'shipTo_street2',
        label: 'Ship To Street 2',
        type: 'string',
        required: false
      },
      {
        key: 'shipTo_street 3',
        label: 'Ship To Street 3',
        type: 'string',
        required: false
      },
      {
        key: 'shipTo_city',
        label: 'Ship To City',
        type: 'string',
        required: false
      },
      {
        key: 'shipTo_state',
        label: 'Ship To State',
        type: 'string',
        required: false
      },
      {
        key: 'shipTo_postalCode',
        label: 'Ship To Postal Code',
        type: 'string',
        required: false
      },
      {
        key: 'shipTo_country',
        label: 'Ship To Country',
        type: 'string',
        required: false
      },
      {
        key: 'shipTo_phone',
        label: 'Ship To Phone',
        type: 'string',
        required: false
      },
      {
        key: 'shipTo_residential',
        label: 'Ship To Residential',
        type: 'boolean',
        required: false
      },
      {
        key: 'billTo_name',
        label: 'Bill To Name',
        type: 'string',
        required: false
      },
      {
        key: 'billTo_company',
        label: 'Bill To Company',
        type: 'string',
        required: false
      },
      {
        key: 'billTo_street1',
        label: 'Bill To Street 1',
        type: 'string',
        required: false
      },
      {
        key: 'billTo_street2',
        label: 'Bill To Street 2',
        type: 'string',
        required: false
      },
      {
        key: 'billTo_street 3',
        label: 'Bill To Street 3',
        type: 'string',
        required: false
      },
      {
        key: 'billTo_city',
        label: 'Bill To City',
        type: 'string',
        required: false
      },
      {
        key: 'billTo_state',
        label: 'Bill To State',
        type: 'string',
        required: false
      },
      {
        key: 'billTo_postalCode',
        label: 'Bill To Postal Code',
        type: 'string',
        required: false
      },
      {
        key: 'billTo_country',
        label: 'Bill To Country',
        type: 'string',
        required: false
      },
      {
        key: 'billTo_phone',
        label: 'Bill To Phone',
        type: 'string',
        required: false
      },
      {
        key: 'billTo_residential',
        label: 'Bill To Residential',
        type: 'boolean',
        required: false
      },
      {
        key: 'shipByDate',
        label: 'Ship By Date',
        type: 'datetime'
      },
      {
        key: 'customerUsername',
        label: 'Customer Username',
        type: 'string'
      },
      {
        key: 'customerEmail',
        label: 'Customer Email',
        type: 'string'
      },
      {
        key: 'items',
        label: 'items',
        children: [{
            key: 'lineItemKey',
            label: 'Line Item Key',
            type: 'string'
          },
          {
            key: 'sku',
            label: 'SKU',
            type: 'string'
          },
          {
            key: 'name',
            label: 'Name',
            type: 'string'
          },
          {
            key: 'imageUrl',
            label: 'Image Url',
            type: 'string'
          },
          {
            key: 'weight',
            label: 'Weight',
            type: 'string'
          },
          {
            key: 'quantity',
            label: 'Quantity',
            type: 'number'
          },
          {
            key: 'unitPrice',
            label: 'Unit Price',
            type: 'number'
          },
          {
            key: 'productId',
            label: 'Product ID',
            type: 'number'
          },
          {
            key: 'fulfillmentSku',
            label: 'Fulfilment SKU',
            type: 'string'
          },
          {
            key: 'adjustment',
            label: 'Adjustment',
            type: 'boolean'
          },
          {
            key: 'upc',
            label: 'UPC',
            type: 'string'
          }
        ]
      },
      {
        key: 'taxAmount',
        label: 'Tax Amount',
        type: 'number'
      },
      {
        key: 'amountPaid',
        label: 'Amount Paid',
        type: 'number'
      },
      {
        key: 'shippingAmount',
        label: 'Shipping Amount',
        type: 'number'
      },
      {
        key: 'customerNotes',
        label: 'Customer Notes',
        type: 'string'
      },
      {
        key: 'internalNotes',
        label: 'Internal Notes',
        type: 'string'
      },
      {
        key: 'gift',
        label: 'Gift',
        type: 'boolean'
      },
      {
        key: 'giftMessage',
        label: 'Gift Message',
        type: 'string'
      },
      {
        key: 'paymentMethod',
        label: 'Payment Method',
        type: 'string'
      },
      {
        key: 'requestedShippingService',
        label: 'Requested Shipping Service',
        type: 'string'
      },
      {
        key: 'carrierCode',
        label: 'Carrier Code',
        type: 'string'
      },
      {
        key: 'serviceCode',
        label: 'Service Code',
        type: 'string'
      },
      {
        key: 'packageCode',
        label: 'Package Code',
        type: 'string'
      },
      {
        key: 'confirmation',
        label: 'Confirmation',
        type: 'string'
      },
      {
        key: 'shipDate',
        label: 'Ship Date',
        type: 'datetime'
      },
      {
        key: 'weight',
        label: 'Weight',
        type: 'string'
      },
      {
        key: 'dimensions_length',
        label: 'Length',
        type: 'number'
      },
      {
        key: 'dimensions_width',
        label: 'Width',
        type: 'number'
      },
      {
        key: 'dimensions_height',
        label: 'height',
        type: 'number'
      },
      {
        key: 'dimensions_units',
        label: 'Units',
        type: 'string'
      },

      {
        key: 'insuranceOptions_provider',
        label: 'Provider',
        type: 'string'
      },
      {
        key: 'insuranceOptions_insureShipment',
        label: 'Insure Shipment',
        type: 'boolean'
      },
      {
        key: 'insuranceOptions_insuredValue',
        label: 'Insured Value',
        type: 'number'
      },
      {
        key: 'internationalOptions_contents',
        label: 'Contents',
        type: 'string',
        choices: {
          merchandise: 'merchandise',
          documents: 'documents',
          gift: 'gift',
          returned_good: 'returned_goods',
          sample: 'sample'
        }
      },
      {
        key: 'internationalOptions_nonDelivery',
        label: 'Non Delivery',
        type: 'string'
      },

      {
        key: 'advancedOptions_warehouseId',
        label: 'Warehouse Id',
        type: 'number'
      },
      {
        key: 'advancedOptions_nonMachinable',
        label: 'Non Machinable',
        type: 'boolean'
      },
      {
        key: 'advancedOptions_saturdayDelivery',
        label: 'Saturday Delivery',
        type: 'boolean'
      },
      {
        key: 'advancedOptions_containsAlcohol',
        label: 'Contails Alcohol',
        type: 'boolean'
      },
      {
        key: 'advancedOptions_customField1',
        label: 'Custom Field 1',
        type: 'string'
      },
      {
        key: 'advancedOptions_customField2',
        label: 'Custom Field 2',
        type: 'string'
      },
      {
        key: 'advancedOptions_customerField3',
        label: 'Custom Field 3',
        type: 'string'
      },
      {
        key: 'advancedOptions_source',
        label: 'Source',
        type: 'string'
      },
      {
        key: 'advancedOptions_mergedOrSplit',
        label: 'Merged Or Split',
        type: 'boolean'
      },
      {
        key: 'advancedOptions_parentId',
        label: 'Parent Id',
        type: 'number'
      },
      {
        key: 'advancedOptions_billToParty',
        label: 'Bill To Party',
        type: 'string'
      },
      {
        key: 'advancedOptions_billToAccount',
        label: 'Bill To Account',
        type: 'string'
      },
      {
        key: 'advancedOptions_billToPostalCode',
        label: 'Bill To Postal Code',
        type: 'string'
      },
      {
        key: 'advancedOptions_billToCountryCode',
        label: 'Bill To Country Code',
        type: 'string'
      },
      {
        key: 'advancedOptions_billToOtherAccount',
        label: 'billToOtherAccount',
        type: 'string'
      },

      {
        key: 'tagIds',
        list: true,
        label: 'Tag Ids',
        type: 'number'
      }
    ],
    sample: {
      'orderNumber': 'TEST-ORDER-API-DOCS',
      'orderKey': '0f6bec18-3e89-4881-83aa-f392d84f4c74',
      'orderDate': '2015-06-29T08:46:27.0000000',
      'createDate': '2016-02-16T15:16:53.7070000',
      'modifyDate': '2016-02-16T15:16:53.7070000',
      'paymentDate': '2015-06-29T08:46:27.0000000',
      'shipByDate': '2015-07-05T00:00:00.0000000',
      'orderStatus': 'awaiting_shipment',
      'customerId': null,
      'customerUsername': 'headhoncho@whitehouse.gov',
      'customerEmail': 'headhoncho@whitehouse.gov',
      'billTo': {
        'name': 'The President',
        'company': null,
        'street1': null,
        'street2': null,
        'street3': null,
        'city': null,
        'state': null,
        'postalCode': null,
        'country': null,
        'phone': null,
        'residential': null,
        'addressVerified': null
      },
      'shipTo': {
        'name': 'The President',
        'company': 'US Govt',
        'street1': '1600 Pennsylvania Ave',
        'street2': 'Oval Office',
        'street3': null,
        'city': 'Washington',
        'state': 'DC',
        'postalCode': '20500',
        'country': 'US',
        'phone': '555-555-5555',
        'residential': false,
        'addressVerified': 'Address validation warning'
      },
      'items': [{
          'orderItemId': 192210956,
          'lineItemKey': 'vd08-MSLbtx',
          'sku': 'ABC123',
          'name': 'Test item #1',
          'imageUrl': null,
          'weight': {
            'value': 24,
            'units': 'ounces'
          },
          'quantity': 2,
          'unitPrice': 99.99,
          'taxAmount': 2.5,
          'shippingAmount': 5,
          'warehouseLocation': 'Aisle 1, Bin 7',
          'options': [{
            'name': 'Size',
            'value': 'Large'
          }],
          'productId': null,
          'fulfillmentSku': null,
          'adjustment': false,
          'upc': '32-65-98',
          'createDate': '2016-02-16T15:16:53.707',
          'modifyDate': '2016-02-16T15:16:53.707'
        },
        {
          'orderItemId': 192210957,
          'lineItemKey': null,
          'sku': 'DISCOUNT CODE',
          'name': '10% OFF',
          'imageUrl': null,
          'weight': {
            'value': 0,
            'units': 'ounces'
          },
          'quantity': 1,
          'unitPrice': -20.55,
          'taxAmount': null,
          'warehouseLocation': null,
          'options': [],
          'productId': null,
          'fulfillmentSku': 'SKU-Discount',
          'adjustment': true,
          'upc': null,
          'createDate': '2016-02-16T15:16:53.707',
          'modifyDate': '2016-02-16T15:16:53.707'
        }
      ],
      'orderTotal': 194.43,
      'amountPaid': 218.73,
      'taxAmount': 5,
      'shippingAmount': 10,
      'customerNotes': 'Thanks for ordering!',
      'internalNotes': 'Customer called and would like to upgrade shipping',
      'gift': true,
      'giftMessage': 'Thank you!',
      'paymentMethod': 'Credit Card',
      'requestedShippingService': 'Priority Mail',
      'carrierCode': 'fedex',
      'serviceCode': 'fedex_2day',
      'packageCode': 'package',
      'confirmation': 'delivery',
      'shipDate': '2015-07-02',
      'holdUntilDate': null,
      'weight': {
        'value': 25,
        'units': 'ounces'
      },
      'dimensions': {
        'units': 'inches',
        'length': 7,
        'width': 5,
        'height': 6
      },
      'insuranceOptions': {
        'provider': 'carrier',
        'insureShipment': true,
        'insuredValue': 200
      },
      'internationalOptions': {
        'contents': null,
        'customsItems': null,
        'nonDelivery': null
      },
      'advancedOptions': {
        'warehouseId': 9876,
        'nonMachinable': false,
        'saturdayDelivery': false,
        'containsAlcohol': false,
        'mergedOrSplit': false,
        'mergedIds': [],
        'parentId': null,
        'storeId': 12345,
        'customField1': 'Custom data that you can add to an order. See Custom Field #2 & #3 for more info!',
        'customField2': "Per UI settings, this information can appear on some carrier's shipping labels. See link below",
        'customField3': 'https://help.shipstation.com/hc/en-us/articles/206639957',
        'source': 'Webstore',
        'billToParty': null,
        'billToAccount': null,
        'billToPostalCode': null,
        'billToCountryCode': null
      },
      'tagIds': null,
      'userId': null,
      'externallyFulfilled': false,
      'externallyFulfilledBy': null
    }

  }
}
