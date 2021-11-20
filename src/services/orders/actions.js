/* eslint-disable */
import { CREATE_ORDER, CURRENT_ORDER, CLEAR_ALL_ORDERS } from './actionTypes'
import { LOADER } from '../alert/actionTypes'
import api from '../../config/api'
export const createOrder = (postData) => (dispatch) => {
  let url = api.store.CerateOrder.cerate.path
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status == 'success') {
        dispatch({ type: LOADER, payload: false })
        dispatch({
          type: CREATE_ORDER,
          payload: data.payload,
        })
        dispatch({
          type: CURRENT_ORDER,
          payload: data.payload?.new_order,
        })
      }
    })
}

export const fetchOrders = (postData, loader) => (dispatch) => {
  let url = api.store.FetchOrder.fetch.path

  loader ? dispatch({ type: LOADER, payload: true }) : null
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status == 'success') {
        dispatch({
          type: CREATE_ORDER,
          payload: data.payload,
        })
        dispatch({ type: LOADER, payload: false })
      }
    })
}
export const clearOrders = () => (dispatch) => {
  dispatch({
    type: CLEAR_ALL_ORDERS,
    payload: [],
  })
}
