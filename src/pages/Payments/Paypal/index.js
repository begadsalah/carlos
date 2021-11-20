import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import { connect, useDispatch, useSelector } from 'react-redux'
import { triggerPayment } from '../../../services/payment/actions'
import * as CONSTANTS from '../../../config/constants/statusCodes'
import { PayPalButton } from 'react-paypal-button-v2'
import Text from '../../Containers/Text'

const PayPal = (props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const PaymentInfo = useSelector((state) => state.payment.paymentInfo)
  const UserInfo = useSelector((state) => state.payment.userInfo)

  const Alert = useSelector((state) => state?.alert)
  const trigger = () => {
    // setLoading(!loading)
    props.onClick(CONSTANTS.PAYPAL)
  }

  useEffect(() => {
    if (
      Alert.status_code === CONSTANTS.PAYMENT_SUCCESS &&
      PaymentInfo?.gateway === CONSTANTS.PAYPAL
    ) {
      props.SuccessAction(CONSTANTS.PAYPAL, 2) // status
    }
  }, [Alert])

  const paymentValidation = (data) => {
    const { store_id, user_info, payment_info } = props
    let postData = {
      store_id: store_id,
      user_info: user_info,
      payment_info: payment_info,
      order_id: data.orderID,
      payer_id: data.payerID,
    }
    dispatch(triggerPayment(postData))
  }
  return (
    <div
      className='osahan-card rounded shadow-sm bg-white mb-3'
      onClick={() => trigger()}
    >
      <div className='osahan-card-header' id='paypal-div'>
        <h2 className='mb-0'>
          <button
            disabled={loading}
            className='d-flex p-3 align-items-center btn text-decoration-none text-success w-100'
            type='button'
            data-toggle='collapse'
            data-target='#paypal-div-open'
            aria-expanded='false'
            aria-controls='paypal-div-open'
          >
            <i className='icofont-brand-paypal mr-3'></i>{' '}
            <Text Key={'paypal'} />
            <i className='icofont-rounded-down ml-auto'></i>
          </button>
        </h2>
      </div>
      <div
        id='paypal-div-open'
        className='collapse'
        aria-labelledby='paypal-div'
        data-parent='#accordionExample'
      >
        <div className='border-top'>
          <div className='card-body text-center'>
            <PayPalButton
              commit={true}
              onCancel={() => props.setLoading(false)}
              createOrder={(data, actions) => {
                // props.setLoading(true)
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: props.currency?.toUpperCase(),
                        value: PaymentInfo?.amount,
                      },
                    },
                  ],
                })
              }}
              onApprove={(data, actions) => {
                props.setLoading(true)
                setLoading(true)
                // Capture the funds from the transaction
                return actions.order.capture().then(function (details) {
                  // Show a success message to your buyer
                  // alert("Transaction completed by " + details.payer.name.given_name);

                  paymentValidation(data)
                })
              }}
              options={{
                currency: props.currency?.toUpperCase(),
                clientId: props.publicKey,
              }}
            />
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
export default connect(mapSateToProps, {})(PayPal)
