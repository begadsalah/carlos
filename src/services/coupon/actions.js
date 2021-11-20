import { ADD_COUPON, REMOVE_ALL_COUPON } from './actionTypes'
import * as CONSTANTS from '../../config/constants/statusCodes'
import {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  WARNING_MESSAGE,
} from '../alert/actionTypes'

import Axios from 'axios'
import api from '../../config/api'

export const applyCoupon = (postData) => (dispatch) => {
  let url = api.store.AddCoupon.fetch.path
  Axios.post(url, {
    ...postData,
  }).then((response) => {
    const data = response.data
    if (data.status === CONSTANTS.COUPON_ADD_SUCCESS) {
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {
          message: data.message,
          status_code: data.status,
        },
      })
      dispatch({
        type: ADD_COUPON,
        payload: data.payload,
      })
    } else {
      dispatch({
        type: ERROR_MESSAGE,
        payload: {
          message: data.message,
          status_code: data.status,
        },
      })
      dispatch({
        type: REMOVE_ALL_COUPON,
        payload: {},
      })
    }
  })
}
export const removeCoupon = () => (dispatch) => {
  dispatch({
    type: REMOVE_ALL_COUPON,
    payload: {},
  })
}
