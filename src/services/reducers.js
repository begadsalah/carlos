import { combineReducers } from "redux";
import AuthReducer from "./authentication/authReducer";
import storeReducer from "./store/reducer";
import cartReducer from "./cart/reducer";
import orderReducer from "./orders/reducer";
import translationReducer from "./languages/reducer";
import payment from "./payment/reducers";
import alert from "./alert/reducer";
import coupons from "./coupon/reducer";
import checkout_payment from "./checkout-payment/reducer";
import splash from "./splash/reducer";
export default combineReducers({
    auth: AuthReducer,
    store: storeReducer,
    cart: cartReducer,
    orders: orderReducer,
    translation: translationReducer,
    payment,
    alert,
    coupons,
    checkout_payment,
    splash
});
