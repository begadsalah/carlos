import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../../../components/Header'
import SideBar from '../../../components/SideBar'
import { NavLink, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchStoreItems } from '../../../services/store/action'
import {
  addToCart,
  setCart,
  removeFromCart,
  removeAllFromCart,
  updateCart,
  updateTotalAmount,
} from '../../../services/cart/actions'
import { createOrder, clearOrders } from '../../../services/orders/actions'
import { setOrderData } from '../../../services/checkout-payment/actions'
import { enableLoader } from '../../../services/alert/actions'
import {
  setPaymentUserInfo,
  setPaymentInfo,
} from '../../../services/payment/actions'
import domain from '../../../config/api/domain'
import ROUTE from '../../../config/route'
import FooterBar from '../../Containers/FooterBar'
import PriceRender from '../../Containers/PriceRender'
import {
  calculateTotal,
  cartValidation,
  applyCoupon,
} from '../helpers/cart/utility'
import { findDataById } from '../../../helpers/object'

import Payments from '../../Payments'
import PromoCode from './PromoCode'
import ApplyCouponRender from './PromoCode/ApplyCouponRender'
import ItemHeader from '../../../components/item-header'
import isRtl from '../../../bootstrap'
import Delivery from './Delivery'
import { Room } from './Room'
import './Cart.css'
let storeId = null
class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      phone: null,
      comments: null,
      table_no: null,
      table_code: null,
      // room_no: null,
      room_code: null,
      room_number: null,
      dob_customer: null,
      subtotal: 0,
      total: 0,
      delivery_cost: null,
      button_disabled: false,
      is_loading: false,
      is_completed: false,
      order_type: null,
      address: null,
      city: null,
      area: null,
      errors: [],
      mode_payment: null,
      cart_data: [],
    }
    this.onChange = this.onChange.bind(this)
  }
  componentWillMount() {
    this.checkPaymentRedirect()
    findDataById(this.props.tables, this.props.scan_table).then((data) => {
      if (data?.length) {
        this.setState({
          table_no: data[0]?.table_name,
          order_type: 1,
        })
      }
    })
    storeId = this.props.match.params.store_id
    let data = { view_id: storeId }
    let Subtotal = calculateTotal(
      this.props.cart,
      this.props.coupon,
      this.props,
      storeId
    )
    let total = applyCoupon(this.props.coupon, Subtotal)
    this.setState({ sub_total: Subtotal })
    this.setState({ total: total })
    this.checkEmpty(this.props.cart)

    if (this.props.translation.is_rlt) {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl')
    }
  }
  componentWillUnmount() {
    this.props.clearOrders()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cart || nextProps.coupon) {
      let Subtotal = calculateTotal(
        nextProps.cart,
        nextProps.coupon,
        this.props,
        storeId
      )
      let total = applyCoupon(nextProps.coupon, Subtotal)
      this.setState({ sub_total: Subtotal })
      this.setState({ total: total })
      this.checkEmpty(nextProps.cart)
    }
    if (nextProps.orders !== this.props.orders) {
      this.setState({ is_completed: 'COMPLETED' })
      this.props.removeAllFromCart()
      localStorage.removeItem('redirect_payment_id')
    }
  }

  checkPaymentRedirect = () => {
    const params = new URLSearchParams(this.props.location.search)
    if (params.get('preference_id')) {
      if (
        localStorage.getItem('redirect_payment_id') ===
          params.get('preference_id') &&
        params.get('status') === 'approved'
      ) {
        this.props.enableLoader()
        this.setState({ is_completed: 'WAIT_FOR_PAYMENT' })
        this.setState({
          phone: this.props?.checkout_payment?.paymentOrderInfo.customer_phone,
        })
        this.props.createOrder(this.props?.checkout_payment?.paymentOrderInfo)
      } else if (
        localStorage.getItem('redirect_payment_id') !==
          params.get('preference_id') ||
        params.get('status') !== 'approved'
      ) {
        alert('INVALID PAYMENT ')
      }
    }
  }

  hasErrors = (key) => {
    const { errors } = this.state
    return errors.includes(key) ? styles.hasErrors : null
  }
  checkEmpty = (cart) => {
    let data = cart.filter((data) => data.storeId === storeId)
    let check = cart.find((data) => data.count <= 0)
    check !== undefined
      ? this.setState({ button_disabled: true })
      : this.setState({ button_disabled: false })
  }
  renderData = (TYPE, ID) => {
    let { products, cart, addons } = this.props
    let response
    switch (TYPE) {
      case 'NAME':
        response = products.find((data) => data.id === ID).name[
          this.props.translation?.language_name
            ? this.props.translation?.language_name
            : 'en'
        ]
        break
      case 'IMAGE':
        response = products.find((data) => data.id === ID).image_url
        break
      case 'PRICE':
        response = products.find((data) => data.id === ID).price
        break
      case 'ADDON_PRICE':
        response = addons.find((data) => data.id === ID).price
        break
      case 'ADDON_NAME':
        response = addons.find((data) => data.id === ID).addon_name[
          this.props.translation?.language_name
            ? this.props.translation?.language_name
            : 'en'
        ]
        break
    }
    return response
  }
  updateCart = (_id, REF, count, type, addon, extra) => {
    let newextra = []
    if (type === 'ADD') {
      this[`textInput${REF}`].value = count + 1
      if (extra) {
        for (let index = 0; index < extra.length; index++) {
          let newcount = count
          newextra.push({
            addon_id: extra[index].addon_id,
            count: extra[index].count,
            calculationcount: extra[index].count + extra[index].count * count,
          })
        }
      }
    } else if (type === 'SUB') {
      if (count - 1 <= 0) return
      this[`textInput${REF}`].value = count - 1
      for (let index = 0; index < extra.length; index++) {
        newextra.push({
          addon_id: extra[index].addon_id,
          count: extra[index].count,
          calculationcount: extra[index].calculationcount - extra[index].count,
        })
      }
    }
    let data = {
      _id: _id,
      storeId: storeId,
      itemId: REF,
      count: parseInt(this[`textInput${REF}`].value - count),
      addon: addon,
      extra: newextra,
    }

    this.props.updateCart(data)
  }
  removeFormCart = (_id) => {
    this.props.removeFromCart(_id)
  }
  renderItems = () => {
    let { products, cart, account_info } = this.props
    let currency = account_info ? account_info.currency_symbol : '₹'
    cart = cart.filter((data) => data.storeId === storeId)
    return (
      <div className='px-15 row'>
        <div className='cart_info-body border-radius-4px bg-white margin-top-15px  col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
          {cart.map((data, cartInedx) => (
            <div
              key={cartInedx.toString()}
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'space-evenly',
                alignContent: 'flex-start',
                alignItems: 'flex-start',
              }}
              className='cart-item-meta pt-15 pb-15 align-items-center border-bottom'
            >
              <div
                // style={{ display: "flex", flex: 1 }}
                className='cart-item-name'
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{ display: 'flex', flex: 1 }}>
                    <i
                      className='icofont-ui-delete text-danger'
                      onClick={() => this.removeFormCart(data._id)}
                    ></i>
                    <span className='false cart-itemname-left-9px'>
                      <strong>{this.renderData('NAME', data.itemId)}</strong>
                    </span>
                  </div>
                  <div className=''>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                      }}
                    >
                      <PriceRender
                        currency={currency ? currency : '₹'}
                        price={this.renderData(
                          data.addon === null ? 'PRICE' : 'ADDON_PRICE',
                          data.addon === null ? data.itemId : data.addon
                        )}
                      />
                    </div>
                  </div>
                  <div className='cart-item-price'>
                    {data.addon != null
                      ? this.renderData('ADDON_NAME', data.addon)
                      : null}
                  </div>
                </div>
                <br />
                {data.extra && data.extra.length ? (
                  <div className='extra-span'>
                    <p className='mb-1 text-muted'>
                      Extra: <span className='float-right text-dark'></span>
                    </p>
                    {data?.extra?.map((ext) => (
                      <p className='mb-1 text-muted'>
                        {this.renderData('ADDON_NAME', ext.addon_id)} x{' '}
                        {ext.count}
                        <span className='float-right text-dark'>
                          {' '}
                          <PriceRender
                            currency={data.addon === null ? currency : null}
                            price={this.renderData('ADDON_PRICE', ext.addon_id)}
                          />{' '}
                        </span>
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className='btn-group btn-group-sm cart-item-btn cart-button-left-5px'>
                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                    alignContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}
                  className='input-group input-spinner ml-auto cart-items-number'
                >
                  <div className='input-group-prepend'>
                    <button
                      className='btn btn-success btn-sm'
                      type='button'
                      onClick={() =>
                        this.updateCart(
                          data._id,
                          data.itemId,
                          data.count,
                          'SUB',
                          data.addon,
                          data.extra
                        )
                      }
                    >
                      {' '}
                      -
                    </button>
                  </div>
                  <input
                    type='text'
                    className='form-control'
                    value={data.count}
                    placeholder=''
                    ref={(input) => {
                      this[`textInput${data.itemId}`] = input
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      flex: 1,
                      alignContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}
                    className='input-group-append'
                  >
                    <button
                      className='btn btn-success btn-sm'
                      type='button'
                      onClick={() =>
                        this.updateCart(
                          data._id,
                          data.itemId,
                          data.count,
                          'ADD',
                          data.addon,
                          data.extra
                        )
                      }
                    >
                      {' '}
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
      </div>
    )
  }
  onChange(e) {
    if (e.target.name === 'order_type' && e.target.value !== 3) {
      this.setState({ delivery_cost: null })
    }
    this.setState({ [e.target.name]: e.target.value })
  }
  validation = async () => {
    let errors = cartValidation(this.state, this.props)
    this.setState({ errors })
  }
  submitForm = (event) => {
    event.preventDefault()
    const {
      name,
      phone,
      table_no,
      table_code,
      total,
      button_disabled,
      is_loading,
      errors,
      order_type,
      address,
    } = this.state
    const { cart, tables, translation } = this.props
    this.validation().then((e) => {
      if (this.state.errors.length) return
      let data = {
        store_id: storeId,
        table_no: this.state.table_no,
        order_type: this.state.order_type,
        address: this.state.address,
        customer_name: this.state.name,
        customer_phone: this.state.phone,
        comments: this.state.comments,
        room_number: this.state.room_number,
        dob_customer: this.state.dob_customer,
        total: (
          Number(this.state.total) +
          Number(this.props.service_charge) +
          Number(this.state.total) * Number(this.props.tax / 100) +
          Number(this.state.delivery_cost)
        ).toFixed(2),
        cart: cart.filter((data) => data.storeId === storeId),
        store_charge: this.props.service_charge,
        tax: Number((this.state.total * this.props.tax) / 100).toFixed(2),
        sub_total: Number(this.state.total).toFixed(2),
        delivery_cost: this.state.delivery_cost
          ? Number(this.state.delivery_cost)
          : 0,
        coupon_name: this.props.coupon?.name,
        city: this.state.city,
        area: this.state.area,
      }
      this.setState({ is_loading: true })
      this.setState({ cart_data: data })
      this.props.setPaymentUserInfo(data)
      this.setState({ is_completed: 'WAIT_FOR_PAYMENT' })
      // this.props.createOrder(data);
    })
  }

  triggerCreateOrder = (payment_method, status, type) => {
    if (type === 'POPUP') {
      const data = this.state.cart_data
      data['payment_status'] = status
      data['payment_type'] = payment_method
      // console.table(data)
      this.props.createOrder(data)
    } else {
      const data = this.state.cart_data
      data['payment_status'] = status
      data['payment_type'] = payment_method
      this.props.setOrderData(data)
    }
  }

  renderTableCode = (table_name) => {
    const rtlSttle = {
      display: 'flex',
      alignItems: 'flex-start',
    }
    const hasErrors = this.hasErrors
    const { tables, translation } = this.props
    let data = tables.filter((data) => data.table_name === table_name)
    if (data[0]?.table_code) {
      return (
        <div className='form-group'>
          <label style={rtlSttle} htmlFor='exampleInputNEWPassword1'>
            {translation?.enter_your_table_code || 'Enter Your Code'}
          </label>
          <input
            style={rtlSttle}
            style={hasErrors('table_code')}
            type='text'
            className='form-control'
            name='table_code'
            placeholder={
              translation?.enter_your_table_code || 'Enter Your Code'
            }
            value={this.state.table_code}
            onChange={this.onChange}
          />
        </div>
      )
    }
  }

  renderRoomCode = (room_name) => {
    const rtlSttle = {
      display: 'flex',
      alignItems: 'flex-start',
    }
    const hasErrors = this.hasErrors
    const { rooms, translation } = this.props
    let data = rooms.filter((data) => data.room_name === room_name)
    if (data[0]?.room_code) {
      return (
        <div className='form-group'>
          <label style={rtlSttle} htmlFor='exampleInputNEWPassword1'>
            {translation?.enter_your_room_code || 'Enter Your Code'}
          </label>
          <input
            style={rtlSttle}
            style={hasErrors('room_code')}
            type='text'
            className='form-control'
            name='room_code'
            placeholder={translation?.enter_your_room_code || 'Enter Your Code'}
            value={this.state.room_code}
            onChange={this.onChange}
          />
        </div>
      )
    }
  }

  InvoiceRow = (text, currency, price) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div style={{}}>{text}</div>
      <div>
        <PriceRender currency={currency} price={price} />
      </div>
    </div>
  )
  render() {
    const { errors, delivery_cost } = this.state
    const hasErrors = this.hasErrors
    let { products, cart, account_info, translation, new_orders, store_phone } =
      this.props
    console.log('new_orders', new_orders.order_unique_id)
    const rtlSttle = {
      display: 'flex',
      alignItems: 'flex-start',
    }
    let currency = account_info ? account_info.currency_symbol : '₹'

    if (this.state.is_completed === 'WAIT_FOR_PAYMENT') {
      return (
        <Payments
          SuccessAction={this.triggerCreateOrder}
          data={this.state.cart_data}
        />
      )
    } else if (this.state.is_completed === 'COMPLETED') {
      return (
        <div>
          <div className='osahan-success vh-100'>
            <ItemHeader
              title={
                translation?.menu_order_successmsg ||
                'Order Placed Successfully.'
              }
              onClick={() => window.history.back(-1)}
            />
            <div className='p-5 text-center bg-white'>
              <img src='/img/success.gif' className='cart-success' />
              <p className='ohsuccess'>
                {' '}
                {translation?.menu_order_successmsg ||
                  'Order Placed Successfully.'}{' '}
              </p>
            </div>
            <div className='p-0 bg-white text-center'>
              <h6 className='font-weight-bold text-secondary'>
                {translation?.your_order_number_is || ' Your Order No is'}:
              </h6>
              <h4 className='font-weight-bold text-dark'>
                {new_orders?.order_unique_id}
              </h4>
            </div>
          </div>
          <div className='fixed-bottom fixed-bottom-auto red-bg p-3  text-center cart-success-footer'>
            <br />
            {this.props.is_whatsappbutton_enable === 1 ? (
              <a
                target='_blank'
                href={`https://api.whatsapp.com/send?phone=${store_phone}&text=${new_orders?.render_whatsapp_message}`}
                className='btn rounded bg-white text-success btn-lg btn-block shadow'
              >
                <i className='icofont-whatsapp'></i> &nbsp;
                <b>
                  {translation?.send_order_whatsapp || 'Send Order On Whatsapp'}{' '}
                </b>
              </a>
            ) : null}
            <br />
            <NavLink
              to={`${ROUTE.ACCOUNT.ORDERS.PAGES.VIEW.PATH}/${new_orders.order_unique_id}`}
              className='btn rounded btn-warning btn-lg btn-block'
            >
              <i className='icofont-restaurant'></i> &nbsp;
              <b>
                {translation?.menu_check_orderstatus || 'Check Order Status'}{' '}
              </b>
            </NavLink>
          </div>
        </div>
      )
    } else if (this.props.cart.length === 0) {
      return (
        <div>
          <ItemHeader
            onClick={() => window.history.back(-1)}
            title={translation?.menu_cart_empty || 'Your cart is empty.'}
          />
          <div className='osahan-success new-bg-empty vh-100'>
            <div className='p-5 text-center'>
              <img src='/img/bag.png' className='cart-empty' />
              <p className='ohNo'>
                {' '}
                {translation?.menu_cart_empty || 'Your cart is empty.'}{' '}
              </p>
            </div>
          </div>

          <div className='fixed-bottom fixed-bottom-auto red-bg rounded p-3 m-3 text-center'>
            <h6 className='font-weight-bold mb-2 text-white'>
              {translation?.menu_cart_empty || 'Your cart is empty.'}
            </h6>

            <a
              href={`${ROUTE.STORE.INDEX.PAGES.VIEW.PATH}/${storeId}`}
              className='btn rounded btn-lg bg-white btn-block'
            >
              {translation?.back_to_menu || 'Back to Menu.'}{' '}
            </a>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className='fixed-bottom-padding bg-light-v2'>
            <ItemHeader
              onClick={() => window.history.back(-1)}
              title={translation?.cart || 'Cart'}
            />
            <div className='osahan-body oshanBody row'>
              {this.renderItems()}
              <div className='px-15  col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
                <div className='p-3 bg-white cart_info-body border-radius-4px'>
                  <div className='form-group'>
                    <label
                      className='rtl-label'
                      style={rtlSttle}
                      htmlFor='exampleInputOLDPassword1'
                    >
                      {' '}
                      {translation?.menu_name || 'Name'} *
                    </label>
                    <input
                      style={hasErrors('name')}
                      name='name'
                      type='text'
                      required
                      placeholder={translation?.menu_name || 'Name'}
                      className='form-control'
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label
                      className='rtl-label'
                      style={rtlSttle}
                      htmlFor='exampleInputNEWPassword1'
                    >
                      {translation?.menu_phone_number || 'Phone Number'} *
                    </label>
                    <input
                      style={hasErrors('phone')}
                      type='number'
                      placeholder={
                        translation?.menu_phone_number || 'Phone Number'
                      }
                      className='form-control'
                      name='phone'
                      required
                      value={this.state.phone}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className='form-group'>
                    <label
                      className='rtl-label'
                      style={rtlSttle}
                      htmlFor='exampleInputNEWPassword1'
                    >
                      {translation?.order_type || 'Order Type'} *
                    </label>
                    <select
                      style={hasErrors('order_type')}
                      type='text'
                      className='form-control'
                      name='order_type'
                      placeholder='Enter Your Table No'
                      value={this.state.order_type}
                      onChange={this.onChange}
                    >
                      <option value=''>
                        {translation?.order_type || 'Order Type'}
                      </option>

                      {this.props.is_dining_enable !== 1 ? null : (
                        <option
                          disabled={
                            this.props.is_dining_enable !== 1
                              ? 'disabled'
                              : null
                          }
                          value='1'
                        >
                          {translation?.cart_order_type_status_dining ||
                            'Dining'}
                        </option>
                      )}
                      {this.props.is_takeaway_enable !== 1 ? null : (
                        <option
                          disabled={
                            this.props.is_takeaway_enable !== 1
                              ? 'disabled'
                              : null
                          }
                          value='2'
                        >
                          {translation?.cart_order_type_status_takeaway ||
                            'Takeaway'}
                        </option>
                      )}
                      {this.props.is_delivery_enable !== 1 ? null : (
                        <option
                          value='3'
                          disabled={
                            this.props.is_delivery_enable !== 1
                              ? 'disabled'
                              : null
                          }
                        >
                          {translation?.cart_order_type_status_delivery ||
                            'Delivery'}
                        </option>
                      )}
                      {this.props.is_room_delivery_enable !== 1 ? null : (
                        <option
                          value='4'
                          disabled={
                            this.props?.is_room_delivery_enable !== 1
                              ? 'disabled'
                              : null
                          }
                        >
                          {translation?.cart_order_type_status_room || 'Room'}
                        </option>
                      )}
                    </select>
                  </div>

                  {this.state.order_type === 1 ? (
                    <div>
                      {this.props.tables.length &&
                      this.props.is_table_enable === 1 ? (
                        <div className='form-group'>
                          <label
                            className='rtl-label'
                            style={rtlSttle}
                            htmlFor='exampleInputNEWPassword1'
                          >
                            {translation?.select_your_table ||
                              'Select Your Table'}
                          </label>
                          <select
                            type='text'
                            className='form-control'
                            name='table_no'
                            placeholder='Enter Your Table No'
                            value={this.state.table_no}
                            style={{
                              ...rtlSttle,

                              ...hasErrors('table_no'),
                            }}
                            onChange={this.onChange}
                          >
                            <option value=''>
                              {translation?.select_your_table ||
                                'Select Your Table'}
                            </option>
                            {this.props.tables &&
                              this.props.tables.map((data) => (
                                <option>{data.table_name}</option>
                              ))}
                          </select>
                        </div>
                      ) : null}
                      {this.renderTableCode(this.state.table_no)}
                    </div>
                  ) : null}
                  {this.state.order_type === 3 ? (
                    <>
                      <Delivery
                        translation={translation}
                        hasErrors={hasErrors}
                        onChange={this.onChange}
                        onChangecity={(city) =>
                          this.setState({
                            city: city,
                          })
                        }
                        setDeliveryCost={(cost) =>
                          this.setState({
                            delivery_cost: cost,
                          })
                        }
                        onChangearea={(area) =>
                          this.setState({
                            area: area,
                          })
                        }
                        address={this.state.address}
                      />
                    </>
                  ) : null}

                  {this.state.order_type === 4 ? (
                    <div>
                      <div className='form-group'>
                        <Room
                          room_number={this.state.room_number}
                          hasErrors={hasErrors}
                          translation={translation}
                          style={rtlSttle}
                          onChange={this.onChange}
                        />
                      </div>
                      {this.props?.is_room_delivery_dob_enable === 1 ? (
                        <>{this.renderRoomCode(this.state.room_number)}</>
                      ) : null}
                    </div>
                  ) : null}

                  <div className='form-group'>
                    <label style={rtlSttle} htmlFor='exampleInputNEWPassword1'>
                      {translation?.menu_comment || 'Comment'}{' '}
                    </label>
                    <input
                      type='text'
                      placeholder={translation?.menu_comment || 'Comment'}
                      className='form-control'
                      name='comments'
                      value={this.state.comments}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <br />

                <PromoCode />

                <br />
                <div className=''>
                  <div className='bg-white bill-details cart_info-body border-radius-4px mb-200'>
                    <div className='p-15'>
                      {this.InvoiceRow(
                        translation?.menu_subtotal || 'Subtotal',
                        currency,
                        this.state.sub_total
                      )}
                      <hr />
                      <ApplyCouponRender
                        price={this.state.sub_total - this.state.total}
                      />
                      <hr />

                      {this.InvoiceRow(
                        translation?.menu_service_charge || 'Service Charge',
                        currency,
                        this.props.service_charge
                          ? this.props.service_charge
                          : 0
                      )}
                      <hr />
                      {delivery_cost && (
                        <>
                          {this.InvoiceRow(
                            translation?.store_view_orders_delivery ||
                              'Delivery',
                            'Delivery',
                            delivery_cost
                          )}
                          <hr />
                        </>
                      )}

                      {this.InvoiceRow(
                        `${translation?.menu_tax || 'Tax'}  (%)`,
                        currency,
                        (this.state.total * this.props.tax) / 100
                      )}
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => this.submitForm()}
              disabled={
                this.state.button_disabled || this.state.is_loading
                  ? 'disabled'
                  : null
              }
              className='fixed-bottom align-items-center btn btn-lg btn-block text-white'
              style={{ backgroundColor: '#60B246' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                  alignContent: 'flex-start',
                }}
              >
                <div className='more'>
                  <h6 className='m-0'>
                    {translation?.menu_total_cost || 'Total Cost'}:{' '}
                    <PriceRender
                      currency={currency}
                      price={
                        Number(
                          this.state.delivery_cost
                            ? this.state.delivery_cost
                            : 0
                        ) +
                        Number(this.state.total) +
                        Number(this.props.service_charge) +
                        Number(this.state.total) * Number(this.props.tax / 100)
                      }
                    />
                  </h6>
                  <p className='m-0'>
                    {translation?.menu_confirm_order || 'Confirm your order.'}
                  </p>
                </div>
                <div>
                  <i
                    className={
                      this.props.translation.is_rlt
                        ? 'icofont-simple-left'
                        : `icofont-simple-right`
                    }
                  ></i>
                </div>
              </div>
            </button>
          </div>
        </div>
      )
    }
  }
}
const styles = {
  hasErrors: {
    borderColor: 'red',
  },
}

const mapSateToProps = (state) => ({
  store_name: state.store.store_name,
  scan_table: state.store.table_number,
  store_phone: state.store?.store_phone,
  service_charge: state.store.service_charge,
  tax: state.store.tax,
  description: state.store.description,
  sliders: state.store.sliders,
  recommendedItems: state.store.recommendedItems,
  account_info: state.store.account_info,
  categories: state.store.categories,
  products: state.store.products,
  cart: state.cart.Items,
  coupon: state.coupons.applied_coupon,
  orders: state.orders.Orders,
  new_orders: state.orders?.current_order,
  is_table_enable: state.store?.is_table_enable,
  is_search_enable: state.store?.is_search_enable,
  is_language_enable: state.store?.is_language_enable,
  is_whatsappbutton_enable: state.store?.is_whatsappbutton_enable,
  is_room_delivery_enable: state.store?.is_room_delivery_enable,
  is_room_delivery_dob_enable: state.store?.is_room_delivery_dob_enable,
  is_dining_enable: state.store?.is_dining_enable,
  is_delivery_enable: state.store?.is_delivery_enable,
  is_takeaway_enable: state.store?.is_takeaway_enable,
  tables: state.store.tables,
  rooms: state.store.rooms,
  addons: state.store.addons,
  translation: state.translation?.active?.data,
  checkout_payment: state.checkout_payment,
  cities: state.store.cities,
})
export default connect(mapSateToProps, {
  fetchStoreItems,
  addToCart,
  updateCart,
  setCart,
  createOrder,
  removeFromCart,
  removeAllFromCart,
  setPaymentUserInfo,
  setPaymentInfo,
  updateTotalAmount,
  clearOrders,
  setOrderData,
  enableLoader,
})(Cart)
