import React, { useEffect, useState } from 'react'
import Text from '../../../Containers/Text'
import { connect, useDispatch, useSelector } from 'react-redux'
import ReactDOMServer from 'react-dom/server'
import TextInput from '../../../Containers/TextInput'
import { applyCoupon, removeCoupon } from '../../../../services/coupon/actions'
import * as CONSTANTS from '../../../../config/constants/statusCodes'
const PromoCode = (props) => {
  const [promoCode, setPromoCode] = useState(null)
  const dispatch = useDispatch()
  const Alert = useSelector((state) => state?.alert)
  const onChange = async (e) => {
    setPromoCode(e.target.value)
  }
  const triggerApply = () => {
    if (!promoCode) return
    let data = {
      view_id: props.store.store_id,
      coupon_code: promoCode,
    }

    dispatch(applyCoupon(data))
  }

  const renderMessage = () => {
    if (Alert.status_code === CONSTANTS.COUPON_ADD_SUCCESS)
      return (
        <div className='alert alert-success padding-top-2'>
          {' '}
          <Text Key={'coupon_applied_success_description'} />{' '}
        </div>
      )
    else if (Alert.status_code === CONSTANTS.COUPON_ADD_FAILED) {
      return (
        <div
          style={{ display: 'flex' }}
          className='alert alert-danger padding-top-2'
        >
          {' '}
          <Text Key={'coupon_applied_invalid_description'} />{' '}
        </div>
      )
    } else return null
  }

  return (
    <div className='p-3 bg-white border-radius-4px cart_info-body'>
      <div className='row'>
        <div className='col-8 m-0 pr-1'>
          <TextInput
            onChange={onChange}
            type='text'
            className='form-control'
            id='exampleInputPromo1'
            Key={'enter_promo_code'}
          />
        </div>
        <div className='col-4 pl-1'>
          <button
            type='submit'
            onClick={() => triggerApply()}
            disabled={false}
            className='btn btn-success btn-block'
          >
            <Text Key={'apply_promo'} />
          </button>
        </div>
      </div>
      <br />
      {renderMessage()}
    </div>
  )
}
const mapSateToProps = (state) => ({
  store: state?.store,
  cart: state?.cart,
  coupon: state.coupons?.applied_coupon,
})

export default connect(mapSateToProps, { applyCoupon })(PromoCode)
