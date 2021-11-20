import { OPEN_SPLASH, CLOSE_SPLASH } from "./actionTypes";
export const openSplash = data => dispatch => {
    dispatch({
        type: OPEN_SPLASH,
        payload: data
    });
};

export const closeSplash = data => dispatch => {
    dispatch({
        type: CLOSE_SPLASH,
        payload: data
    });
};
