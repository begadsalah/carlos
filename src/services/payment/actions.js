import {
  GET_PAYMENT_GATEWAYS,
  STRIPE_PAYMENT_REQUEST,
  SET_PAYMENT_USER_INFO,
  SET_PAYMENT_INFO,
  SET_PAYMENT_ORDER_INFO,
} from './actionTypes'
import {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  WARNING_MESSAGE,
} from '../alert/actionTypes'
import Axios from 'axios'
import api from '../../config/api'
import { SET_PAYMENT_CHECK_OUT_PAYMENT } from '../checkout-payment/actionTypes'
export const triggerPayment = (postData) => (dispatch) => {
  let url = api.store.CheckoutPayment.fetch.path
  Axios.post(url, {
    ...postData,
  })
    .then((response) => {
      const data = response.data
      if (data.status === 'PAYMENT-200') {
        dispatch({
          type: SUCCESS_MESSAGE,
          payload: {
            message: data.message,
            status_code: data.status,
          },
        })
      } else if (data.status === 'PAYMENT-202') {
        dispatch({
          type: SUCCESS_MESSAGE,
          payload: { message: data.message, status_code: data.status },
        })
        dispatch({
          type: SET_PAYMENT_ORDER_INFO,
          payload: data.payload[0],
        })
        dispatch({
          type: SET_PAYMENT_CHECK_OUT_PAYMENT,
          payload: postData,
        })
      } else {
        dispatch({
          type: ERROR_MESSAGE,
          payload: {
            message: data.message,
            status_code: data.status,
          },
        })
      }
    })
    .catch((e) => {
      console.log(e)
    })
}

export const setPaymentUserInfo = (postData) => (dispatch) => {
  let data = {
    name: postData?.customer_name,
    phone: postData?.customer_phone,
    email: postData?.customer_email,
  }
  dispatch({
    type: SET_PAYMENT_USER_INFO,
    payload: data,
  })
}

export const setPaymentInfo = (postData) => (dispatch) => {
  let data = {
    currency: postData?.currency,
    amount: postData?.amount,
    description: postData?.description,
    gateway: postData?.gateway,
  }

  dispatch({
    type: SET_PAYMENT_INFO,
    payload: data,
  })
}

// import { GET_PAYMENT_GATEWAYS,
//     STRIPE_PAYMENT_REQUEST,
//     SET_PAYMENT_USER_INFO,
//     SET_PAYMENT_INFO,
//     SET_PAYMENT_ORDER_INFO
//    } from "./actionTypes";
// import {SET_PAYMENT_CHECK_OUT_PAYMENT} from '../checkout-payment/actionTypes'
// import {
//    SUCCESS_MESSAGE,
//    ERROR_MESSAGE,
//    WARNING_MESSAGE
// } from "../alert/actionTypes";
// import Axios from "axios";
// import api from "../../config/api";
// export const triggerPayment = postData => dispatch => {
//    let url = api.store.CheckoutPayment.fetch.path;
//    Axios.post(url, {
//        ...postData
//    })
//        .then(response => {
//            const data = response.data;
//            console.log(data);
//            if (data.status === "PAYMENT-200") {
//                dispatch({
//                    type: SUCCESS_MESSAGE,
//                    payload: {
//                        message: data.message,
//                        status_code: data.status
//                    }
//                });
//            }
//            else if (data.status === "PAYMENT-202"){
//                dispatch({type: SET_PAYMENT_ORDER_INFO, payload: data.payload[0]})
//                dispatch({type: SUCCESS_MESSAGE,payload: {message: data.message, status_code: data.status}});
//                dispatch({type: SET_PAYMENT_CHECK_OUT_PAYMENT, payload: postData})
//            }
//            else {
//                dispatch({
//                    type: ERROR_MESSAGE,
//                    payload: {
//                        message: data.message,
//                        status_code: data.status
//                    }
//                });
//            }
//        })
//        .catch(e => {
//            console.log(e);
//        });
// };

// export const setPaymentUserInfo =  postData => dispatch => {
//    let data = {
//        name: postData?.customer_name,
//        phone: postData?.customer_phone,
//        email: postData?.customer_email
//    };
//   dispatch({
//        type: SET_PAYMENT_USER_INFO,
//        payload: data
//    });
// };

// export const setPaymentInfo =  postData => dispatch => {
//    let data = {
//        currency:postData?.currency,
//        amount:postData?.amount,
//        description:postData?.description,
//        gateway:postData?.gateway
//    };

//   dispatch({
//        type: SET_PAYMENT_INFO,
//        payload: data
//    });
// };
