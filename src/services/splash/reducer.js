import { OPEN_SPLASH, CLOSE_SPLASH } from "./actionTypes";

const initialState = {
    splash: false
};

export default function(state = initialState, actions) {
    switch (actions.type) {
        case OPEN_SPLASH:
            return {
                splash: true
            };
        case CLOSE_SPLASH:
            return {
                splash: false
            };
        default:
            return state;
    }
}
