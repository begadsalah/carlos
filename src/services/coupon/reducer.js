import { ADD_COUPON, REMOVE_ALL_COUPON } from './actionTypes';

const initialState = {

    applied_coupon: {}
}



export default function (state = initialState, actions) {
    switch (actions.type) {
        case ADD_COUPON:
            return {
                ...state,
                applied_coupon: actions.payload
            }
        case REMOVE_ALL_COUPON: {
            return {
                ...state,
                applied_coupon: {}
            }
        }


        default: return state;
    }
}
