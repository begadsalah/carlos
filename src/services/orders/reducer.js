import {CREATE_ORDER,CURRENT_ORDER,FETCH_ORDERS,CLEAR_ALL_ORDERS} from './actionTypes';

const initialState = {
   current_order:{},
   Orders:[]
}

export default function(state = initialState, actions){
    switch(actions.type){
        case CREATE_ORDER:
            return {
                ...state,
                Orders:actions.payload.data
            }
        case CURRENT_ORDER:
            return {
                ...state,
                current_order:actions.payload
                }
        case CLEAR_ALL_ORDERS:
        return {
            current_order:{},
            Orders:[]
        }
        default : return state;
    }
}
