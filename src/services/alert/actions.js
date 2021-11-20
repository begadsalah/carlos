import {SUCCESS_MESSAGE, ERROR_MESSAGE, WARNING_MESSAGE, CLEAR_ALL_MESSAGE} from './actionTypes'
import {LOADER} from '../alert/actionTypes'
export const setSuccessMessage = (data)=>dispatch=>{
    dispatch({
        type:SUCCESS_MESSAGE,
        payload:data
    })
}

export const setErrorMessage = (data)=>dispatch=>{
    dispatch({
        type:SUCCESS_MESSAGE,
        payload:data
    })
}

export const clearAllMessage = (data) => dispatch => {
    dispatch({
        type:CLEAR_ALL_MESSAGE,
        payload:[]
    })
}
export const enableLoader = ()=>dispatch=>{
    dispatch({type: LOADER,payload: true})
}
