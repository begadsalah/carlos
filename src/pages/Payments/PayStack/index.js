/* eslint-disable */

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
// import ROUTE from "../../config/route";
// import domain from '../../config/api/domain';
import { connect, useDispatch, useSelector } from 'react-redux'
import * as CONSTANTS from '../../../config/constants/statusCodes'
import { triggerPayment } from '../../../services/payment/actions'
import Text from '../../Containers/Text'
import { usePaystackPayment } from 'react-paystack'
import PriceRender from '../../Containers/PriceRender'

const SubmitButton = ({ processing, error, children, disabled }) => (
  <div className='fixed-bottom'>
    <button
      className={`btn btn-success btn-block ${
        error ? 'btn btn-danger btn-block' : ''
      }`}
      type='submit'
      // disabled={processing || disabled}
    >
      {processing ? 'Processing...' : children}
    </button>
  </div>
)

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
  className,
}) => (
  <div className={className}>
    <label htmlFor={id} className='form-label font-weight-bold small'>
      {label}
    </label>
    <input
      className='form-control'
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
)
const PayStack = (props) => {
  const paymentInfo = useSelector((state) => state.payment?.paymentInfo)
  const paymentOrderInfo = useSelector(
    (state) => state.payment?.paymentOrderInfo
  )
  const alert = useSelector((state) => state?.alert)
  const [loading, setLoading] = useState(false)

  const [billingDetails, setBillingDetails] = useState({
    email: props?.userData?.email ?? '',
    phone: props?.userData?.phone ?? '',
    name: props?.userData?.name ?? '',
  })
  const dispatch = useDispatch()

  const config = {
    reference: new Date().getTime(),
    email: billingDetails?.email,
    amount: props?.totalAmount * 100,
    currency: (props?.currency).toUpperCase(),
    publicKey: props?.publicKey,
    // publicKey:props?.publicKey
  }
  const initializePayment = usePaystackPayment(config)
  useEffect(() => {
    // initiate_Payment()
  }, [paymentInfo])

  useEffect(() => {
    if (alert.status_code == CONSTANTS.PAYMENT_ORDER_CREATED) {
      triggerPayStackPopup()
    }
  }, [alert && paymentOrderInfo])

  const triggerStackPayment = () => {
    setLoading(true)
    props.onClick(CONSTANTS.PAYSTACK)
  }
  const initiate_Payment = () => {
    const { store_id, user_info, payment_info } = props
    let data = {
      store_id: store_id,
      user_info: user_info,
      payment_info: payment_info,
    }
    // props.setLoading(true)
    paymentInfo.gateway == CONSTANTS.PAYSTACK ? triggerPayStackPopup() : null
  }
  // you can call this function anything
  const onSuccess = (reference) => {
    if (reference?.status == 'success') {
      props.SuccessAction(CONSTANTS.PAYSTACK, 2)
    }
  }

  // you can call this function anything
  const onClose = () => {
    props.setLoading(false)
    setLoading(false)
  }

  const triggerPayStackPopup = (event) => {
    event.preventDefault()
    props.setLoading(true)

    initializePayment(onSuccess, onClose)
  }

  return (
    <div
      className='osahan-card rounded shadow-sm bg-white mb-3'
      onClick={() => triggerStackPayment()}
    >
      <div className='osahan-card-header' id='paystack-div'>
        <h2 className='mb-0'>
          <button
            disabled={loading}
            className='d-flex p-3 align-items-center btn text-decoration-none text-success w-100'
            type='button'
            data-toggle='collapse'
            data-target='#paystack-div-open'
            aria-expanded='false'
            aria-controls='paystack-div-open'
          >
            <i className='icofont-globe mr-3'></i> <Text Key={'pay_stack'} />
            <i className='icofont-rounded-down ml-auto'></i>
          </button>
        </h2>
      </div>
      <div
        id='paystack-div-open'
        className='collapse'
        aria-labelledby='paystack-div'
        data-parent='#accordionExample'
      >
        <div className='border-top'>
          <div className='card-body'>
            <form onSubmit={triggerPayStackPopup}>
              <div className='form-row'>
                <Field
                  className='col-md-12 form-group'
                  label={<Text Key={'store_customer_name'} />}
                  id='name'
                  type='text'
                  placeholder='Jane Doe'
                  required
                  autoComplete='name'
                  value={billingDetails.name}
                  onChange={(e) => {
                    setBillingDetails({
                      ...billingDetails,
                      name: e.target.value,
                    })
                  }}
                />
                <Field
                  className='col-md-12 form-group'
                  label={<Text Key={'email'} />}
                  id='email'
                  type='email'
                  placeholder='janedoe@gmail.com'
                  required
                  autoComplete='email'
                  value={billingDetails.email}
                  onChange={(e) => {
                    setBillingDetails({
                      ...billingDetails,
                      email: e.target.value,
                    })
                  }}
                />

                <Field
                  className='col-md-12 form-group'
                  label={<Text Key={'store_phone_no'} />}
                  id='phone'
                  type='tel'
                  placeholder='(941) 555-0123'
                  required
                  autoComplete='tel'
                  value={billingDetails.phone}
                  onChange={(e) => {
                    setBillingDetails({
                      ...billingDetails,
                      phone: e.target.value,
                    })
                  }}
                />

                <SubmitButton>
                  {<Text Key={'pay'} />}&nbsp;
                  <PriceRender price={paymentInfo.amount} />
                </SubmitButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapSateToProps = (state) => ({
  store_id: state.store?.store_id,
  user_info: state.payment?.userInfo,
  payment_info: state.payment?.paymentInfo,
  paymentOrderInfo: state.payment?.paymentOrderInfo,
})
export default connect(mapSateToProps, {})(PayStack)
