import { FETCH_TRANSLATION, FETCH_ALL_TRANSLATION } from './actionTypes'
import { LOADER } from '../alert/actionTypes'
import { OPEN_SPLASH, CLOSE_SPLASH } from '../splash/actionTypes'
import api from '../../config/api'

export const fetchTranslation = (postData) => (dispatch) => {
  dispatch({
    type: FETCH_TRANSLATION,
    payload: postData.select_lang,
  })
}
const arraysEqual = (a1, a2) => a1.length === a2.length

export const fetchAllTranslation = (postData) => (dispatch) => {
  const { view_id, lang_state } = postData
  let id = !view_id.includes('cart/') ? view_id : view_id.replace('cart/', '')
  let newId = !id.includes('/') ? id : id.replace('/', '')
  const { languages } = lang_state
  const stateLang = languages.hasOwnProperty('data') ? languages.data : []
  dispatch({ type: OPEN_SPLASH })
  let url = api.store.All_Translation.fetch.path
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ view_id: newId }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)

      const arraEqual = arraysEqual(stateLang, data.payload?.data)
      let leng = 0

      for (let index = 0; index < data.payload?.data.length; index++) {
        if (data.payload?.data[index].id === stateLang[index]?.id) {
          leng++
        }
      }
      if (data.status === 'success') {
        if (arraEqual && leng === data.payload?.data.length) {
        } else {
          dispatch({
            type: FETCH_ALL_TRANSLATION,
            payload: data.payload,
          })
          dispatch({
            type: FETCH_TRANSLATION,
            payload: data.payload.data[0],
          })
        }
      }
      dispatch({ type: CLOSE_SPLASH })
    })
}
