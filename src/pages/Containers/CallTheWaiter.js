import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import domain from '../../config/api/domain'
import { connect } from 'react-redux'
import useDynamicRefs from 'use-dynamic-refs'
import NotificationSystem from 'react-notification-system'
import {
  callTheWaiter,
  initial_configuration,
} from '../../services/store/action'
import { findDataById } from '../../helpers/object'
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
class CallTheWaiter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      phone: null,
      comments: '',
      table_no: null,
      table_code: null,
      total: 0,
      button_disabled: false,
      is_loading: false,
      is_completed: false,
      errors: [],
    }
    this.onChange = this.onChange.bind(this)
  }
  notificationSystem = React.createRef()
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  componentWillMount() {
    findDataById(this.props.tables, this.props.scan_table).then((data) => {
      if (data?.length) {
        this.setState({
          table_no: data[0]?.table_name,
          order_type: 1,
        })
      }
    })
  }
  renderTableCode = (table_name) => {
    const { tables, translation } = this.props
    if (tables) {
      let data = tables.filter((data) => data.table_name === table_name)
      if (data[0]?.table_code) {
        return (
          <div className='form-group'>
            <label
              style={
                {
                  display: 'flex',
                  alignItems: 'flex-start',
                }
                // ...this.hasErrors("table_code")
              }
              htmlFor='exampleInputNEWPassword1'
            >
              {translation?.enter_your_table_code || 'Enter Your Code'}
            </label>
            <input
              type='text'
              className='form-control'
              name='table_code'
              placeholder={
                translation?.enter_your_table_code || 'Enter Your Code'
              }
              value={this.state.table_code || ''}
              onChange={this.onChange}
            />
          </div>
        )
      }
    }
    return null
  }

  cartValidation(state, props) {
    const { name, phone, table_no, table_code } = state
    const errors = []

    if (!name) errors.push('name')
    if (!phone) errors.push('phone')
    if (!table_no) errors.push('table_no')
    if (!table_code) errors.push('table_code')

    return errors
  }

  validation = async () => {
    let errors = this.cartValidation(this.state, this.props)
    this.setState({ errors })
  }
  submitCallWaiter = () => {
    const notification = this.notificationSystem.current
    const {
      name,
      phone,
      table_no,
      table_code,
      total,
      button_disabled,
      is_loading,
      comments,
    } = this.state

    const { tables, translation } = this.props
    this.validation().then((e) => {
      if (this.state.errors.length) return
      if (!(name && phone) && is_loading === false) return

      if (table_no) {
        let data = tables.filter((data) => data.table_name === table_no)
        if (data[0]?.table_code) {
          if (!(data[0]?.table_code === table_code)) {
            alert(
              translation?.table_code_error_message ||
                'INVALID TABLE CODE/PLEASE ENTER A VALID CODE'
            )
            return
          }
        }
      }
      let body = {
        customer_name: name,
        customer_phone: phone,
        table_name: table_no,
        comment: comments,
        store_id: this.props.store_id,
      }
      notification.addNotification({
        message: translation?.calling_waiter_msg || 'calling waiter ....',
        level: 'success',
      })

      this.props.callTheWaiter(body)
      this.props.onCallBack()
      document.getElementById('#call-the-waiter').click()
    })
  }

  hasErrors = (key) => {
    const { errors } = this.state
    return errors && errors.includes(key) ? styles.hasErrors : null
  }
  render() {
    const { translation } = this.props
    const rtlLabel = {
      display: 'flex',
      alignItems: 'flex-start',
    }
    const hasErrors = this.hasErrors
    return (
      <div>
        <NotificationSystem ref={this.notificationSystem} style={style} />
        <div
          className='modal fade'
          id={`call-the-waiter`}
          tabIndex='-1'
          role='dialog'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <div>
                  <h5 className='modal-title' id='exampleModalLabel'>
                    {translation?.call_the_waiter || 'Call The Waiter'}
                  </h5>
                </div>

                <div>
                  <button
                    type='button'
                    className='close'
                    data-dismiss='modal'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>×</span>
                  </button>
                </div>
              </div>
              <div className='modal-body'>
                <div className='form'>
                  <div className='p-3'>
                    <div className='form-group'>
                      <label
                        style={rtlLabel}
                        htmlFor='exampleInputOLDPassword1'
                      >
                        {' '}
                        {translation?.menu_name || 'Name'} *
                      </label>
                      <input
                        style={hasErrors('name')}
                        type='text'
                        placeholder={translation?.menu_name || 'Name'}
                        name='name'
                        className='form-control'
                        value={this.state.name}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className='form-group'>
                      <label
                        style={rtlLabel}
                        htmlFor='exampleInputNEWPassword1'
                      >
                        {translation?.menu_phone_number || 'Phone Number'} *
                      </label>
                      <input
                        type='number'
                        style={hasErrors('phone')}
                        placeholder={
                          translation?.menu_phone_number || 'Phone Number'
                        }
                        className='form-control'
                        name='phone'
                        value={this.state.phone}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className='form-group'>
                      <label
                        style={rtlLabel}
                        htmlFor='exampleInputNEWPassword1'
                      >
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
                    {this.props?.tables && this.props?.tables ? (
                      <div className='form-group'>
                        <label
                          style={rtlLabel}
                          htmlFor='exampleInputNEWPassword1'
                        >
                          {translation?.select_your_table ||
                            'Select Your Table'}
                        </label>
                        <select
                          type='text'
                          className='form-control'
                          name='table_no'
                          style={hasErrors('table_code')}
                          placeholder={
                            translation?.select_your_table ||
                            'Select Your Table'
                          }
                          value={this.state.table_no}
                          onChange={this.onChange}
                        >
                          <option value=''>
                            {' '}
                            {translation?.select_your_table ||
                              'Select Your Table'}
                          </option>
                          {this.props?.tables &&
                            this.props?.tables.map((data, index) => (
                              <option key={index}>{data.table_name}</option>
                            ))}
                        </select>
                      </div>
                    ) : null}
                    {this.renderTableCode(this.state.table_no)}
                  </div>
                </div>
              </div>

              <div className='modal-footer p-0 border-0 fixed-bottom'>
                <div className='col-6 m-0 p-0'>
                  <button
                    type='button'
                    id='call-waiter-close'
                    className='btn btn-dark btn-lg btn-block'
                    data-dismiss='modal'
                  >
                    {translation?.menu_close || 'Close'}{' '}
                  </button>
                </div>
                <div className='col-6 m-0 p-0'>
                  <button
                    type='button'
                    onClick={() => this.submitCallWaiter()}
                    className='btn red-bg text-white btn-lg btn-block'
                  >
                    {' '}
                    {translation?.call_the_waite_now || 'Call Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            style={{ visibility: 'hidden' }}
            type='button'
            id={`#call-the-waiter`}
            className='btn btn-outline-success btn-sm ml-auto'
            data-toggle='modal'
            data-target={`#call-the-waiter`}
          >
            Add
          </button>
        </div>
      </div>
    )
  }
}
const styles = {
  hasErrors: {
    borderColor: 'red',
  },
}
const mapSateToProps = (state) => ({
  scan_table: state.store.table_number,
  // store_name: state.store.store_name,
  // description: state.store.description,
  // sliders: state.store.sliders,
  // recommendedItems: state.store.recommendedItems,
  // account_info: state.store.account_info,
  // categories: state.store.categories,
  // products: state.store.products,
  // cart: state.cart.Items,
  // orders: state.orders.Orders,
  tables: state.store.tables,
  // addons: state.store.addons,
})

export default connect(mapSateToProps, {
  callTheWaiter,
  initial_configuration,
})(CallTheWaiter)
