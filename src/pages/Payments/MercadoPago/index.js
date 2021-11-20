/* eslint-disable */
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
// import ROUTE from "../../config/route";
// import domain from '../../config/api/domain';
import { connect, useDispatch, useSelector } from 'react-redux'
import { triggerPayment } from '../../../services/payment/actions'
import * as CONSTANTS from '../../../config/constants/statusCodes'
import { PayPalButton } from 'react-paypal-button-v2'
import Text from '../../Containers/Text'
import { useHistory, useParams } from 'react-router-dom'

const WayForPay = (props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const paymentInfo = useSelector((state) => state.payment.paymentInfo)
  const paymentOrderInfo = useSelector(
    (state) => state.payment?.paymentOrderInfo
  )
  const cartInfo = useSelector(
    (state) => state.checkout_payment?.paymentOrderInfo
  )
  const UserInfo = useSelector((state) => state.payment.userInfo)
  const history = useHistory()
  const Alert = useSelector((state) => state?.alert)

  useEffect(() => {
    if (paymentInfo.gateway === CONSTANTS.MERCADO_PAGO) {
      initiate_mercado_payment()
    }
  }, [paymentInfo])
  useEffect(() => {
    if (
      Alert.status_code === CONSTANTS.PAYMENT_ORDER_CREATED &&
      paymentInfo.gateway === CONSTANTS.MERCADO_PAGO
    ) {
      props.SuccessAction(CONSTANTS.MERCADO_PAGO, 2, 'CHECKOUT')
    }
  }, [Alert && paymentOrderInfo])

  useEffect(() => {
    if (
      Alert.status_code === CONSTANTS.PAYMENT_REDIRECT &&
      paymentInfo.gateway === CONSTANTS.MERCADO_PAGO
    ) {
      localStorage.setItem('redirect_payment_id', paymentOrderInfo?.id)
      window.location.href = paymentOrderInfo?.init_point
    }
  }, [Alert && cartInfo])

  const trigger = () => {
    setLoading(!loading)
    props.onClick(CONSTANTS.MERCADO_PAGO)
  }

  const initiate_mercado_payment = () => {
    const { store_id, user_info, payment_info } = props
    let data = {
      store_id: store_id,

      user_info: user_info,
      payment_info: payment_info,
      redirect_back_url: window.location.href,
    }
    props.setLoading(true)
    paymentInfo.gateway === CONSTANTS.MERCADO_PAGO
      ? dispatch(triggerPayment(data))
      : null
  }
  return (
    // <h1>Register Customer</h1>
    <div
      className='osahan-card rounded shadow-sm bg-white mb-3'
      onClick={() => trigger()}
    >
      <div className='osahan-card-header' id='swish-div'>
        <h2 className='mb-0'>
          <button
            // disabled={loading}
            className='d-flex p-3 align-items-center btn text-decoration-none text-success w-100'
            type='button'
            data-toggle='collapse'
            data-target='#swish-div-open'
            aria-expanded='false'
            aria-controls='swish-div-open'
          >
            <i className='icofont-globe mr-3'></i> <Text Key={'MercadoPago'} />
            <i className='icofont-rounded-down ml-auto'></i>
          </button>
        </h2>
      </div>
      <div
        id='swish-div-open'
        className='collapse'
        aria-labelledby='swish-div'
        data-parent='#accordionExample'
      >
        <div className='border-top'>
          <div className='card-body text-center'></div>
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
export default connect(mapSateToProps, {})(WayForPay)
