import React from 'react'
import ReactDOM from 'react-dom'
import Moment from 'moment'
import moment from 'moment-timezone'
import Header from '../../components/Header'
import SideBar from '../../components/SideBar'
import { NavLink, Route } from 'react-router-dom'
import ROUTE from '../../config/route'
import { connect } from 'react-redux'
import { fetchOrders } from '../../services/orders/actions'
import { callTheWaiter } from '../../services/store/action'
import FooterBar from '../Containers/FooterBar'
import NotificationSystem from 'react-notification-system'
import PriceRender from '../Containers/PriceRender'
import ItemHeader from '../../components/item-header'
let PhoneNumber = null
var style = {
  NotificationItem: {
    // Override the notification item
    DefaultStyle: {
      // Applied to every notification, regardless of the notification level
      margin: '10px 5px 2px 1px',
      background: '#28a745',
    },
    success: {
      color: 'white',
    },
  },
}
class Orders extends React.Component {
  intervalID = 0
  constructor(props) {
    super(props)
    this.state = {
      phone: null,
      searched: false,
      disable: false,
    }
    this.onChange = this.onChange.bind(this)
  }
  notificationSystem = React.createRef()

  componentWillMount() {
    PhoneNumber = this.props.match.params.phone
      ? this.props.match.params.phone
      : null
    if (PhoneNumber) {
      this.setState({ phone: PhoneNumber })
      this.setState({ searched: true })

      let data = {
        customer_phone: PhoneNumber,
        id: this.props.storeId,
      }
      this.props.fetchOrders(data, this.props?.orders ? true : false)
      this.intervalID = setInterval(() => this.props.fetchOrders(data), 5000)
    }
  }
  orderFetch = (event) => {
    event.preventDefault()
    PhoneNumber = this.state.phone
    this.setState({ searched: true })
    if (PhoneNumber) {
      let data = {
        customer_phone: PhoneNumber,
        id: this.props.storeId,
      }
      this.props.fetchOrders(data, this.props?.orders ? true : false)
      this.intervalID = setInterval(() => this.props.fetchOrders(data), 5000)
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  callWaiter(id) {
    if (this.state.disable) return
    this.setState({ disable: true })
    let body = {
      order_id: id,
    }
    this.props.callTheWaiter(body)
    const notification = this.notificationSystem.current
    notification.addNotification({
      message: 'calling waiter ....',
      level: 'success',
    })
  }
  componentWillUnmount() {
    clearInterval(this.intervalID)
  }
  handleBack = () => {
    if (this.state.searched) {
      this.setState({ searched: false })
      clearInterval(this.intervalID)
    } else {
      window.history.back(-1)
    }

    // this.state.phone === null ? window.history.back(-1) : this.setState({phone:null})
  }
  render() {
    let { orders, account_info, translation } = this.props
    let currency = account_info ? account_info.currency_symbol : '₹'
    return (
      <div>
        <NotificationSystem ref={this.notificationSystem} style={style} />

        <div className='fixed-bottom-padding'>
          <ItemHeader
            onClick={() => this.handleBack()}
            title={translation?.my_order || 'My Orders'}
          />

          {PhoneNumber && this.state.searched ? (
            <main className='bg-light-v2'>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                <h6 className='px-3 top-12px'>
                  {' '}
                  {translation?.menu_current_order || 'Current Order'}{' '}
                </h6>
              </div>
              {orders.filter
                ? orders
                    .filter(
                      (data) =>
                        data.status === 1 ||
                        data.status === 2 ||
                        data.status === 5
                    )
                    .map((data, i) => (
                      <div key={i} className='mb-2 padding-order-details'>
                        <div className='p-3-v2 bg-white'>
                          {data.order_type === 1 &&
                          data.call_waiter_enabled === 1 ? (
                            <div className='pull-right-v2'>
                              <a
                                style={{
                                  background: this.state.disable ? 'red' : '',
                                }}
                                className='mr-5 btn btn-square btn-secondary min-width-125 mb-10 order-status-button text-white'
                                onClick={() => this.callWaiter(data.id)}
                              >
                                {translation?.call_the_waiter ||
                                  'Call The Waiter'}

                                <span className='pulse ml-2'></span>
                              </a>
                            </div>
                          ) : null}

                          <div className='display-flex-v2'>
                            <div className='flex-auto-v2'>
                              <a
                                className={`mr-5 btn btn-square min-width-125  mb-10 order-status-button text-white false btn-${
                                  data.status === 1 ? 'warning' : 'info'
                                }`}
                              >
                                {data.status === 1
                                  ? translation?.order_status_pending ||
                                    'Pending'
                                  : null}{' '}
                                {data.status === 2
                                  ? translation?.order_status_accepted ||
                                    'Accepted'
                                  : null}{' '}
                                {data.status === 5
                                  ? translation?.order_status_ready ||
                                    'Ready to Serve'
                                  : null}
                              </a>
                            </div>
                          </div>
                          <hr />
                          <div className='flex-auto-v2'>
                            <h6 className='font-w700 mb-2 oderid-color-v2'>
                              {data.order_unique_id}
                            </h6>
                            <span className='text-muted pull-right-v2'>
                              {moment(data.created_at)
                                .tz(account_info.time_zone)
                                .format('h:mm:ss a')}{' '}
                              /{' '}
                              <b className='text-danger'>
                                {moment(data.created_at)
                                  .tz(account_info.time_zone)
                                  .format('MMM DD YYYY')}
                              </b>
                            </span>

                            <h6 className='font-w600'>
                              {translation?.menu_store || 'Store'} :{' '}
                              {data.store_name}
                            </h6>
                          </div>
                          <hr />

                          <div className='display-flex-v2 mt-10 font-w700'>
                            <div className='flex-auto'>
                              {translation?.menu_bill_amount || 'Bill Amount'} :
                            </div>

                            <div className='flex-auto text-right'>
                              <b>
                                <PriceRender
                                  currency={currency}
                                  price={data.total}
                                />
                              </b>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                : null}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                <h6 className='px-3 top-12px'>
                  {' '}
                  {translation?.menu_completed_order || 'Completed Order'}
                </h6>
              </div>
              {orders.filter
                ? orders
                    .filter(
                      (data) =>
                        data.status !== 1 &&
                        data.status !== 2 &&
                        data.status !== 5
                    )
                    .map((data) => (
                      <div className='mb-2 padding-order-details'>
                        <div className='p-3-v2 bg-white'>
                          <div className='display-flex-v2'>
                            <div className='flex-auto-v2'>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                }}
                              >
                                <a
                                  className={` btn btn-square min-width-125  mb-10 order-status-button text-white false bg-${
                                    data.status === 3 ? 'danger' : 'success'
                                  } ${data.status === 4 ? 'info' : ''}`}
                                >
                                  {data.status === 3 ? 'Canceled' : ''}
                                  {data.status === 4
                                    ? translation?.order_status_completed ||
                                      'Completed'
                                    : ''}
                                  {data.status === 5 ? 'Ready To Serve' : ''}
                                </a>
                              </div>
                            </div>
                          </div>
                          <hr />

                          <div className='flex-auto-v2'>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                              }}
                            >
                              <h6 className='font-w700 mb-2 oderid-color-v2'>
                                {data.order_unique_id}
                              </h6>
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                }}
                              >
                                <span className='text-muted pull-right-v2'>
                                  {moment(data.created_at)
                                    .tz(account_info.time_zone)
                                    .format('h:mm:ss a')}{' '}
                                  /{' '}
                                  <b className='text-danger'>
                                    {moment(data.created_at)
                                      .tz(account_info.time_zone)
                                      .format('MMM DD YYYY')}
                                  </b>
                                </span>
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                }}
                              >
                                <h6 className='font-w600'>
                                  {translation?.menu_store || 'Store'} :{' '}
                                  {data.store_name}
                                </h6>
                              </div>
                            </div>
                          </div>
                          <hr />

                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                              }}
                            >
                              {translation?.menu_bill_amount || 'Bill Amount'} :
                            </div>

                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                              }}
                            >
                              <b>
                                <PriceRender
                                  currency={currency}
                                  price={data.total}
                                />
                              </b>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                : null}

              <FooterBar translation={translation} active='orders' />
            </main>
          ) : (
            <main>
              <div className='container'>
                <form onSubmit={this.orderFetch}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                    className='input-group mt-3 rounded shadow-sm overflow-hidden bg-white order_search_input'
                  >
                    <div className='input-group-prepend'>
                      <input
                        style={{
                          display: 'flex',
                          flex: 1,
                        }}
                        type='text'
                        className='shadow-none border-0 form-control pl-0'
                        name='phone'
                        required
                        value={this.state.phone}
                        placeholder={`${
                          translation?.menu_phone_number_or_phone ||
                          'Phone Number/Order Id'
                        } *`}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className='input-group-prepend'>
                      <button className='border-0 btn btn-outline-secondary text-dark bg-white'>
                        <i className='icofont-search'></i>
                      </button>
                    </div>
                  </div>
                  <div className='text-center' style={{ marginTop: '20px' }}>
                    <button
                      type='submit'
                      className='btn red-bg text-white btn-block btn-lg'
                    >
                      {translation?.menu_search_order || 'Search Order'}
                    </button>
                  </div>
                </form>
                <FooterBar translation={translation} active='orders' />
              </div>
            </main>
          )}
        </div>
      </div>
    )
  }
}

const mapSateToProps = (state) => ({
  orders: state.orders.Orders,
  account_info: state.store.account_info,
  translation: state.translation?.active?.data,
  storeId: state.store.store_id,
})
export default connect(mapSateToProps, { fetchOrders, callTheWaiter })(Orders)
