/* eslint-disable */
import {
  GET_PAYMENT_GATEWAYS,
  STRIPE_PAYMENT_REQUEST,
  SET_PAYMENT_INFO,
  SET_PAYMENT_USER_INFO,
  SET_PAYMENT_ORDER_INFO,
} from './actionTypes'

const initialState = {
  paymentGateWays: {},
  paymentInfo: {},
  userInfo: {},
  paymentOrderInfo: {},
}

export default function (state = initialState, actions) {
  switch (actions.type) {
    case GET_PAYMENT_GATEWAYS:
      console
      return {
        ...state,
        paymentGateWays: actions.payload,
      }
    case SET_PAYMENT_USER_INFO: {
      return {
        ...state,
        userInfo: actions.payload,
      }
    }
    case SET_PAYMENT_INFO: {
      return {
        ...state,
        paymentInfo: actions.payload,
      }
    }
    case SET_PAYMENT_ORDER_INFO: {
      return {
        ...state,
        paymentOrderInfo: actions.payload,
      }
    }
    case STRIPE_PAYMENT_REQUEST: {
      return {
        ...state,
      }
    }
    default:
      return { state }
  }
}
