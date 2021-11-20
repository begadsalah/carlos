import { FETCH_TRANSLATION, FETCH_ALL_TRANSLATION } from "./actionTypes";
const initialState = {
    languages: [],
    active: [],
    active_language_id: null
};

export default function(state = initialState, actions) {
    switch (actions.type) {
        case FETCH_TRANSLATION:
            return {
                ...state,
                active: actions.payload
            };
        case FETCH_ALL_TRANSLATION:
            return {
                ...state,
                languages: actions.payload
            };
        default:
            return state;
    }
}
