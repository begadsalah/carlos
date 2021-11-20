import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { loadFromStorage, saveToLocalStorage } from "../helpers/localStorage";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { logger } from "redux-logger";

// const middleware = [thunk];
const middleware = [thunk, logger];

const initialState = {};

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: [
        "auth",
        "store",
        "cart",
        "orders",
        "translation",
        "checkout_payment"
    ]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    initialState,
    compose(
        applyMiddleware(...middleware)
        // window.__REDUX_DEVTOOLS_EXTENSION__ &&
        //     window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;
