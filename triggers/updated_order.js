const _ = require('underscore')

const getOrders = async (z, bundle) => {
  try {
    if (bundle.meta.page > 1) {
      z.console.log("META PAGE!!", bundle.meta.page);
      return []
    } else {
    var options = {};
    options.method = 'GET';
    options.url = 'https://ssapi.shipstation.com/orders';
    options.params = {};
    options.params.sortBy = 'ModifyDate';
    options.params.sortDir = 'DESC';
    options.params.pageSize = 500;
    //options.params.page = 1 + bundle.meta.page;
    if (bundle.inputData.storeId) {
      options.params.storeId = bundle.inputData.storeId;
    }
    if (bundle.inputData.orderStatus) {
      options.params.orderStatus = bundle.inputData.orderStatus;
    } 
      let response = await z.request(options)
    
      let orders = response
      orders = orders.json.orders
      //z.console.log("ORDERZZZZ", orders)
      let orderResults = [];
      
      //replaces zap 1 steps 3-5 and the _.map function below. 
      orders.forEach((order) => {
        if(!order.advancedOptions.customField1) {
          order.id = order.orderId + order.modifyDate
          orderResults.push(order)
        } else if (order.advancedOptions.customField1) {
        let apiTimeStamp = new Date(order.advancedOptions.customField1.split("@ ")[1]);
        let modifyDate = new Date(order.modifyDate);
        apiTimeStamp.setHours(apiTimeStamp.getHours()-7);
        let seconds_diff = Math.abs((apiTimeStamp-modifyDate)/1000);
        if(seconds_diff > 15) {
          order.id = order.orderId + order.modifyDate
          orderResults.push(order)
        }
        }
      });
/*      orderResults = _.map(orders, (order) => {
        order.id = order.orderId + order.modifyDate
        return order
      })*/
      z.console.log("Order Results", orderResults);
      return orderResults
    }
  } catch (e) {
    throw new Error((e.message))
  }
}

module.exports = {
  key: 'order',
  noun: 'order ',

  display: {
    label: 'Get Updated Orders',
    description: 'Triggers on updated order'
  },

  operation: {
    inputFields: [
      { key: 'orderStatus', label: 'Order Status', choices: {'awaiting_payment':'Awaiting Payment', 'awaiting_shipment': 'Awaiting Shipment', 'on_hold': 'On Hold', 'cancelled': 'Cancelled', 'shipped': 'Shipped'}, helpText: 'Filter results to only trigger on orders with a specific order status.' },
      { key: 'storeId', label: 'Store Id', dynamic: 'stores.id.storeName', helpText: 'Filter results to only trigger on orders from a specific store.' }
      ],
    perform: getOrders,
    sample:{
      'id': 987654321,
      'orderNumber': 'Test-International-API-DOCS',
      'orderKey': 'Test-International-API-DOCS',
      'orderDate': '2015-06-28T17:46:27.0000000',
      'createDate': '2015-08-17T09:24:14.7800000',
      'modifyDate': '2015-08-17T09:24:16.4800000',
      'paymentDate': '2015-06-28T17:46:27.0000000',
      'shipByDate': '2015-07-05T00:00:00.0000000',
      'orderStatus': 'awaiting_shipment',
      'customerId': 63310475,
      'customerUsername': 'sholmes1854@methodsofdetection.com',
      'customerEmail': 'sholmes1854@methodsofdetection.com',
      'billTo': {
        'name': 'Sherlock Holmes',
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
        'name': 'Sherlock Holmes',
        'company': '',
        'street1': '221 B Baker St',
        'street2': '',
        'street3': null,
        'city': 'London',
        'state': '',
        'postalCode': 'NW1 6XE',
        'country': 'GB',
        'phone': null,
        'residential': true,
        'addressVerified': 'Address not yet validated'
      },
      'items': [
        {
          'orderItemId': 136282568,
          'lineItemKey': null,
          'sku': 'Ele-1234',
          'name': 'Elementary Disguise Kit',
          'imageUrl': null,
          'weight': {
            'value': 12,
            'units': 'ounces'
          },
          'quantity': 2,
          'unitPrice': 49.99,
          'taxAmount': null,
          'shippingAmount': null,
          'warehouseLocation': 'Aisle 1, Bin 7',
          'options': [],
          'productId': 11780610,
          'fulfillmentSku': 'Ele-1234',
          'adjustment': false,
          'upc': null,
          'createDate': '2015-08-17T09:24:14.78',
          'modifyDate': '2015-08-17T09:24:14.78'
        },
        {
          'orderItemId': 136282569,
          'lineItemKey': null,
          'sku': 'CN-9876',
          'name': 'Fine White Oak Cane',
          'imageUrl': null,
          'weight': {
            'value': 80,
            'units': 'ounces'
          },
          'quantity': 1,
          'unitPrice': 225,
          'taxAmount': null,
          'shippingAmount': null,
          'warehouseLocation': 'Aisle 7, Bin 34',
          'options': [],
          'productId': 11780609,
          'fulfillmentSku': null,
          'adjustment': false,
          'upc': null,
          'createDate': '2015-08-17T09:24:14.78',
          'modifyDate': '2015-08-17T09:24:14.78'
        }
      ],
      'orderTotal': 387.97,
      'amountPaid': 412.97,
      'taxAmount': 27.99,
      'shippingAmount': 35,
      'customerNotes': 'Please be careful when packing the disguise kits in with the cane.',
      'internalNotes': 'Mr. Holmes called to upgrade his shipping to expedited',
      'gift': false,
      'giftMessage': null,
      'paymentMethod': null,
      'requestedShippingService': 'Priority Mail Int',
      'carrierCode': 'stamps_com',
      'serviceCode': 'usps_priority_mail_international',
      'packageCode': 'package',
      'confirmation': 'delivery',
      'shipDate': '2015-04-25',
      'holdUntilDate': null,
      'weight': {
        'value': 104,
        'units': 'ounces'
      },
      'dimensions': {
        'units': 'inches',
        'length': 40,
        'width': 7,
        'height': 5
      },
      'insuranceOptions': {
        'provider': null,
        'insureShipment': false,
        'insuredValue': 0
      },
      'internationalOptions': {
        'contents': 'merchandise',
        'customsItems': [
          {
            'customsItemId': 11558268,
            'description': 'Fine White Oak Cane',
            'quantity': 1,
            'value': 225,
            'harmonizedTariffCode': null,
            'countryOfOrigin': 'US'
          },
          {
            'customsItemId': 11558267,
            'description': 'Elementary Disguise Kit',
            'quantity': 2,
            'value': 49.99,
            'harmonizedTariffCode': null,
            'countryOfOrigin': 'US'
          }
        ],
        'nonDelivery': 'return_to_sender'
      },
      'advancedOptions': { 
        'warehouseId': 98765,
        'nonMachinable': false,
        'saturdayDelivery': false,
        'containsAlcohol': false,
        'mergedOrSplit': false,
        'mergedIds': [],
        'parentId': null,
        'storeId': 12345,
        'customField1': 'SKU: CN-9876 x 1',
        'customField2': 'SKU: Ele-123 x 2',
        'customField3': null,
        'source': null,
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
