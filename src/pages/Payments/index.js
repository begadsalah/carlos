/* Date      : 16-03-2021
/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import './styles/styles.css'
import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import TitleHeader from '../../components/Header/TitleHeader'
import { setPaymentInfo } from '../../services/payment/actions'
import PayStack from './PayStack'
import RazorPay from './Razorpay'
import Stripe from './Stripe'
import Cash from './Cash'
import PayPal from './Paypal'
/*import PuffLoader from 'react-spinners/PuffLoader'*/
import * as CONSTANTS from '../../config/constants/statusCodes'
import LoadingOverlay from 'react-loading-overlay'
import Text from '../Containers/Text'
import MercadoPago from './MercadoPago'
import ItemHeader from '../../components/item-header'

const Payments = (props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [payment_method, setPaymentMethod] = useState()
  const PaymentInfo = useSelector((state) => state.payment.paymentInfo)
  const UserInfo = useSelector((state) => state.payment.userInfo)
  const PaymentSettings = useSelector((state) => state.store.payment_settings)

  const TriggerPaymentMethod = (payment_method) => {
    const { store } = props
    props.setPaymentInfo({
      currency: PaymentSettings.StoreCurrency.toLowerCase(),
      amount: props.data?.total,
      description: store.store_name,
      gateway: payment_method,
    })
  }
  const SuccessTrigger = (payment_method, status = 1, type = 'POPUP') => {
    props.SuccessAction(payment_method, status, type)
  }

  return (
    <LoadingOverlay
      active={loading}
      spinner
      styles={{
        overlay: (base) => ({
          ...base,
          position: 'fixed',
        }),
      }}
      text={<Text Key={'processing_order'} />}
    >
      <React.Fragment>
        <div className='osahan-payment'>
          <ItemHeader
            tx={<Text Key={'payment_method'} />}
            onClick={() => window.history.back(-1)}
          />
          <div className='osahan-payment'></div>
          <div className='payment p-3'>
            <div className='accordion' id='accordionExample'>
              {PaymentSettings?.IsCodEnabled === 1 ? (
                <Cash
                  setLoading={setLoading}
                  onClick={TriggerPaymentMethod}
                  SuccessAction={SuccessTrigger}
                  totalAmount={PaymentInfo?.amount}
                  userData={UserInfo}
                />
              ) : null}
              {PaymentSettings?.IsStripeEnabled === 1 ? (
                <Stripe
                  setLoading={setLoading}
                  onClick={TriggerPaymentMethod}
                  SuccessAction={SuccessTrigger}
                  publicKey={PaymentSettings?.StripePublishableKey}
                  totalAmount={PaymentInfo?.amount}
                  userData={UserInfo}
                  currency={PaymentSettings?.StoreCurrency}
                  ZipEnable={PaymentSettings?.IsStripeZipEnabled}
                />
              ) : null}
              {PaymentSettings?.IsPayStackEnabled === 1 ? (
                <PayStack
                  setLoading={setLoading}
                  onClick={TriggerPaymentMethod}
                  SuccessAction={SuccessTrigger}
                  totalAmount={PaymentInfo?.amount}
                  userData={UserInfo}
                  publicKey={PaymentSettings?.PayStackPublishableKey}
                  currency={PaymentSettings?.StoreCurrency}
                />
              ) : null}
              {PaymentSettings?.IsRazorpayEnabled === 1 ? (
                <RazorPay
                  setLoading={setLoading}
                  onClick={TriggerPaymentMethod}
                  SuccessAction={SuccessTrigger}
                  totalAmount={PaymentInfo?.amount}
                  userData={UserInfo}
                  publicKey={PaymentSettings?.RazorpayKeyId}
                  currency={PaymentSettings?.StoreCurrency}
                />
              ) : null}
              {PaymentSettings?.IsPaypalEnabled === 1 ? (
                <PayPal
                  setLoading={setLoading}
                  onClick={TriggerPaymentMethod}
                  SuccessAction={SuccessTrigger}
                  totalAmount={PaymentInfo?.amount}
                  userData={UserInfo}
                  publicKey={PaymentSettings?.PaypalKeyId}
                  currency={PaymentSettings?.StoreCurrency}
                />
              ) : null}
              {PaymentSettings?.IsMercadoPagoEnabled === 1 ? (
                <MercadoPago
                  setLoading={setLoading}
                  onClick={TriggerPaymentMethod}
                  SuccessAction={SuccessTrigger}
                  totalAmount={PaymentInfo?.amount}
                  userData={UserInfo}
                />
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    </LoadingOverlay>
  )
}
const mapSateToProps = (state) => ({
  store: state.store,
  payment_settings: state.store.payment_settings,
})
export default connect(mapSateToProps, { setPaymentInfo })(Payments)
