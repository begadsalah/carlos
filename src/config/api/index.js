import domain from './domain'
const api = {
  store: {
    StoreItems: {
      fetch: {
        name: 'add new activity',
        path: domain.url + '/api/web/store/fetch',
      },
    },
    CerateOrder: {
      cerate: {
        name: 'create order',
        path: domain.url + '/api/web/store/create/order',
      },
    },
    FetchOrder: {
      fetch: {
        name: 'create order',
        path: domain.url + '/api/web/store/account/orders',
      },
    },
    Waiter: {
      call: {
        name: 'Waiter Call',
        path: domain.url + '/api/web/store/waiter/call',
      },
    },
    Translation: {
      fetch: {
        name: 'Translation',
        path: domain.url + '/api/web/store/translation/active',
      },
    },
    All_Translation: {
      fetch: {
        name: 'Translation',
        path: domain.url + '/api/web/store/translations',
      },
    },
    CheckoutPayment: {
      fetch: {
        name: 'Checkout Payment',
        path: domain.url + '/api/web/store/checkout/payment',
      },
    },
    AddCoupon: {
      fetch: {
        name: 'Checkout Payment',
        path: domain.url + '/api/web/store/coupon/add',
      },
    },
  },
}
export default api
