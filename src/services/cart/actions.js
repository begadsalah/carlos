import {ADD_TO_CART,REMOVE_FROM_CART,EMPTY_CART,UPDATE_CART, UPDATE_TOTAL_AMOUNT} from './actionTypes';
import {
    SUCCESS_MESSAGE,
    ERROR_MESSAGE,
    WARNING_MESSAGE
} from "../alert/actionTypes";

import Axios from "axios";
import api from "../../config/api";

export const addToCart=(Item)=>dispatch=>{
    dispatch({
        type:ADD_TO_CART,
        data:Item
    })

}
export const updateCart=(Item)=>dispatch=>{
    dispatch({
        type:UPDATE_CART,
        data:Item
    })

}


export const setCart =(Item)=>dispatch=>{
    dispatch({
        type:ADD_TO_CART,
        data:Item
    })
}

export const removeFromCart = (Id,addon)=>dispatch=>{
    dispatch({
        type:REMOVE_FROM_CART,
        data:Id,
        addon:addon
    })
}

export const removeAllFromCart = (Id)=>dispatch=>{
    dispatch({
        type:EMPTY_CART,
        data:[]
    })
}

export const updateTotalAmount = (amount)=>dispatch=> {
    dispatch({
        type:UPDATE_TOTAL_AMOUNT,
        payload:amount
    })
}
