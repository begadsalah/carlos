/* Date      : 16-03-2021
/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import '../styles/styles.css'
import { stripeCardInput } from '../styles/styles'
import PriceRender from '../../Containers/PriceRender'
import { connect, useDispatch, useSelector } from 'react-redux'
import { triggerPayment } from '../../../services/payment/actions'
import * as CONSTANTS from '../../../config/constants/statusCodes'
import Text from '../../Containers/Text'
const CARD_OPTIONS = stripeCardInput
const CardField = ({ onChange, ZipEnable }) => (
  <div className='col-md-12 form-group'>
    <CardElement
      options={
        (CARD_OPTIONS, { hidePostalCode: ZipEnable === 1 ? false : true })
      }
      onChange={onChange}
    />
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
const SubmitButton = ({ processing, error, children, disabled }) => (
  <div className='fixed-bottom'>
    <button
      className={`btn btn-success btn-block ${
        error ? 'btn btn-danger btn-block' : ''
      }`}
      type='submit'
      disabled={processing || disabled}
    >
      {processing ? 'Processing...' : children}
    </button>
  </div>
)
const ErrorMessage = ({ children }) => (
  <div className='ErrorMessage' role='alert'>
    <svg width='16' height='16' viewBox='0 0 17 17'>
      <path
        fill='#FFF'
        d='M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z'
      />
      <path
        fill='#6772e5'
        d='M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z'
      />
    </svg>
    {children}
  </div>
)
const ResetButton = ({ onClick }) => (
  <button type='button' className='ResetButton' onClick={onClick}>
    <svg width='32px' height='32px' viewBox='0 0 32 32'>
      <path
        fill='#FFF'
        d='M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z'
      />
    </svg>
  </button>
)

const CheckoutForm = ({
  userData,
  totalAmount,
  SuccessAction,
  setLoading,
  ZipEnable,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [, /*paymentMethod*/ setPaymentMethod] = useState(null)
  const [billingDetails, setBillingDetails] = useState({
    email: userData?.email ?? '',
    phone: userData?.phone ?? '',
    name: userData?.name ?? '',
  })
  const store_id = useSelector((state) => state.store?.store_id)
  const user_info = useSelector((state) => state.payment?.userInfo)
  const payment_info = useSelector((state) => state.payment?.paymentInfo)
  const alert = useSelector((state) => state?.alert)

  useEffect(() => {
    setProcessing(false)

    if (alert.status_code === CONSTANTS.PAYMENT_ERROR) setLoading(false)

    if (
      alert.status_code === CONSTANTS.PAYMENT_SUCCESS &&
      payment_info?.gateway === CONSTANTS.STRIPE
    )
      SuccessAction(CONSTANTS.STRIPE, 2) // status
  }, [alert])
  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    if (!stripe || !elements) {
      return
    }

    if (error) {
      elements.getElement('card').focus()
      return
    }

    if (cardComplete) {
      setProcessing(true)
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    })

    if (payload.error) {
      setError(payload.error)
    } else {
      let data = {
        store_id: store_id,
        payment_intent_id: payload.paymentMethod?.id,
        user_info: user_info,
        payment_info: payment_info,
      }

      dispatch(triggerPayment(data))
    }
  }

  const reset = () => {
    setError(null)
    setProcessing(false)
    setPaymentMethod(null)
    setBillingDetails({
      email: '',
      phone: '',
      name: '',
    })
  }

  return alert.status_code === CONSTANTS.PAYMENT_SUCCESS ||
    alert.status_code === CONSTANTS.PAYMENT_ERROR ? (
    <div className='Result'>
      <div className='ResultTitle' role='alert'>
        {alert?.message}
      </div>
      <div className='ResultMessage'>{alert?.payload?.description}</div>
      <ResetButton onClick={reset} />
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
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
        <CardField
          ZipEnable={ZipEnable}
          onChange={(e) => {
            setError(e.error)
            setCardComplete(e.complete)
          }}
        />

        {error && <ErrorMessage>{error.message}</ErrorMessage>}
        <SubmitButton processing={processing} error={error} disabled={!stripe}>
          {<Text Key={'pay'} />}&nbsp;
          <PriceRender price={totalAmount} />
        </SubmitButton>
      </div>
    </form>
  )
}

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
}

const App = ({
  publicKey,
  totalAmount,
  userData,
  SuccessAction,
  onClick,
  setLoading,
  ZipEnable,
}) => {
  const stripePromise = loadStripe(publicKey)
  return (
    <div
      className='osahan-card rounded shadow-sm bg-white mb-3'
      onClick={() => onClick(CONSTANTS.STRIPE)}
    >
      <div className='osahan-card-header' id='headingOne'>
        <h2 className='mb-0'>
          <button
            className='d-flex p-3 align-items-center border-0 btn btn-outline-danger bg-white text-decoration-none text-success w-100'
            type='button'
            data-toggle='collapse'
            data-target='#collapseOne'
            aria-expanded='true'
            aria-controls='collapseOne'
          >
            <i className='icofont-stripe-alt mr-3'></i> <Text Key={'stripe'} />
            <i className='icofont-rounded-down ml-auto'></i>
          </button>
        </h2>
      </div>
      <div
        id='collapseOne'
        className='collapse'
        aria-labelledby='headingOne'
        data-parent='#accordionExample'
      >
        <div className='osahan-card-body p-3 border-top'>
          <h6 className='m-0'>
            {' '}
            <Text Key={'stripe_online_payment'} />
          </h6>
          <p className='small'>
            <span className='osahan-card ml-2 font-weight-bold'>
              <Text Key={'we_accept'} />
            </span>
          </p>
          <div className='AppWrapper'>
            <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
              <CheckoutForm
                ZipEnable={ZipEnable}
                SuccessAction={SuccessAction}
                totalAmount={totalAmount}
                userData={userData}
                setLoading={setLoading}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapSateToProps = (state) => ({})

export default connect(mapSateToProps, { triggerPayment })(App)
