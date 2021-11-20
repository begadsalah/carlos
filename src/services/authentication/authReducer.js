import {FETCH_ACTIVITY,NEW_ACTIVITY} from '../../actions/types';

const initialState = {
    isLogin:false,
    userId:null,
    token:null,
    shopId:null,
}

export default function(state = initialState, actions){
    switch(actions.type){

        case FETCH_ACTIVITY:
            return {
                ...state,
                activities:actions.payload
            }

        case NEW_ACTIVITY:
            return {
                ...state,
                activity:actions.payload
            }



        default : return state;
    }
}
