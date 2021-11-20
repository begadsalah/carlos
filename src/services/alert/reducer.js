import { SUCCESS_MESSAGE, ERROR_MESSAGE, WARNING_MESSAGE, CLEAR_ALL_MESSAGE, LOADER } from "./actionTypes";

const initialState = {
    status_code: null,
    message: null,
    unread_message: [],
    loader:false
};

export default function (state = initialState, actions) {

    switch (actions.type) {
        case SUCCESS_MESSAGE:
            return {
                ...state,
                status_code:actions.payload.status_code,
                message:actions.payload.message
            }
        case ERROR_MESSAGE:
            return {
                ...state,
                status_code:actions.payload.status_code,
                message:actions.payload.message
            }
        case CLEAR_ALL_MESSAGE:
            return {
                status_code: null,
                message: null,
                unread_message: [],
                loader:false
            }
            case LOADER:
                return {
                    ...state,
                    loader:actions.payload
                }

        default: return state
    }
}
