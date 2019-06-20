// create a particular mark_as_shipped by name
const createMarkasshipped = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: 'https://ssapi.shipstation.com/orders/markasshipped',
    body: JSON.stringify({
      orderId: bundle.inputData.orderId,
      carrierCode: bundle.inputData.carrierCode,
      shipDate: bundle.inputData.shipDate,
      trackingNumber: bundle.inputData.trackingNumber,
      notifyCustomer: bundle.inputData.notifyCustomer,
      notifySalesChannel: bundle.inputData.notifySalesChannel
    })
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

module.exports = {
  key: 'Shipped',
  noun: 'Shipped',

  display: {
    label: 'Mark an Order as Shipped',
    description: 'Marks an Order as Shipped.'
  },

  operation: {
    inputFields: [{
        key: 'orderId',
        label: 'Order ID',
        type: 'number',
        required: true
      },
      {
        key: 'carrierCode',
        label: 'Carrier Code',
        type: 'string',
        required: true
      },
      {
        key: 'shipDate',
        label: 'Ship Date',
        type: 'string',
        required: false
      },
      {
        key: 'trackingNumber',
        label: 'Tracking Number',
        type: 'string',
        required: false
      },
      {
        key: 'notifyCustomer',
        label: 'Notify Customer?',
        type: 'boolean',
        required: false
      },
      {
        key: 'notifySalesChannel',
        label: 'Notify Sales Channel?',
        type: 'boolean',
        required: false
      }
    ],
    perform: createMarkasshipped,

    sample: {
      "orderId": 93348442,
      "carrierCode": "usps",
      "shipDate": "2014-04-01",
      "trackingNumber": "913492493294329421",
      "notifyCustomer": true,
      "notifySalesChannel": true
    },
  }
};
