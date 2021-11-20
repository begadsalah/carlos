/* eslint-disable */

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
// import ROUTE from "../../config/route";
// import domain from '../../config/api/domain';
import { connect, useDispatch, useSelector } from 'react-redux'
import * as CONSTANTS from '../../../config/constants/statusCodes'
import { triggerPayment } from '../../../services/payment/actions'
import Text from '../../Containers/Text'
const RazorPay = (props) => {
  const paymentInfo = useSelector((state) => state.payment?.paymentInfo)
  const paymentOrderInfo = useSelector(
    (state) => state.payment?.paymentOrderInfo
  )
  const alert = useSelector((state) => state?.alert)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    initiate_Payment()
  }, [paymentInfo])

  useEffect(() => {
    console.log(alert)
    if (
      alert.status_code == CONSTANTS.PAYMENT_ORDER_CREATED &&
      paymentInfo.gateway == CONSTANTS.RAZORPAY
    ) {
      triggerRazorPayPopup()
    }
  }, [alert && paymentOrderInfo])

  const trigger = () => {
    setLoading(true)
    props.onClick(CONSTANTS.RAZORPAY)
  }
  const initiate_Payment = () => {
    const { store_id, user_info, payment_info } = props
    let data = {
      store_id: store_id,
      // payment_intent_id: payload.paymentMethod?.id,
      user_info: user_info,
      payment_info: payment_info,
    }
    // props.setLoading(true)
    paymentInfo.gateway == CONSTANTS.RAZORPAY
      ? dispatch(triggerPayment(data))
      : null
  }

  const triggerRazorPayPopup = () => {
    props.setLoading(true)

    const options = {
      key: paymentOrderInfo?.razorpayId,
      amount: paymentOrderInfo?.amount,
      name: paymentOrderInfo?.name,
      currency: paymentOrderInfo?.currency,
      order_id: paymentOrderInfo?.orderId,
      handler(response) {
        setLoading(false)
        props.SuccessAction(CONSTANTS.RAZORPAY, 2)
      },
      modal: {
        ondismiss: function () {
          setLoading(false)
          props.setLoading(false)
        },
      },
      prefill: {
        name: paymentOrderInfo?.customer_name,
        contact: paymentOrderInfo?.customer_name.customer_phone,
      },
    }
    const rzp1 = new window.Razorpay(options)
    rzp1.open()
  }
  return (
    <div
      className='osahan-card rounded shadow-sm bg-white mb-3'
      onClick={() => trigger()}
    >
      <div className='osahan-card-header' id='headingTwo'>
        <h2 className='mb-0'>
          <button
            disabled={loading}
            className='d-flex p-3 align-items-center btn text-decoration-none text-success w-100'
            type='button'
            data-toggle='collapse'
            data-target='#collapseTwo'
            aria-expanded='false'
            aria-controls='collapseTwo'
          >
            <i className='icofont-globe mr-3'></i> <Text Key={'razorpay'} />
            <i className='icofont-rounded-down ml-auto'></i>
          </button>
        </h2>
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
export default connect(mapSateToProps, {})(RazorPay)
