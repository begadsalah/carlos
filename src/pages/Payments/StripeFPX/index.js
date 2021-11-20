import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import ROUTE from "../../config/route";
// import domain from '../../config/api/domain';
import { connect, useDispatch, useSelector } from "react-redux";
import { triggerPayment } from "../../../services/payment/actions";
import * as CONSTANTS from "../../../config/constants/statusCodes";
import { PayPalButton } from "react-paypal-button-v2";
import Text from "../../Containers/Text";
const WayForPay = props => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const PaymentInfo = useSelector(state => state.payment.paymentInfo);
    const UserInfo = useSelector(state => state.payment.userInfo);

    const Alert = useSelector(state => state?.alert);
    const trigger = () => {
        // setLoading(!loading)
        props.onClick(CONSTANTS.PAYPAL);
    };
    return (
        // <h1>Register Customer</h1>
        <div
            className="osahan-card rounded shadow-sm bg-white mb-3"
            onClick={() => trigger()}
        >
            <div className="osahan-card-header" id="swish-div">
                <h2 className="mb-0">
                    <button
                        // disabled={loading}
                        className="d-flex p-3 align-items-center btn text-decoration-none text-success w-100"
                        type="button"
                        data-toggle="collapse"
                        data-target="#swish-div-open"
                        aria-expanded="false"
                        aria-controls="swish-div-open"
                    >
                        <i className="icofont-brand-swish mr-3"></i>{" "}
                        <Text Key={"paypal"} />
                        <i className="icofont-rounded-down ml-auto"></i>
                    </button>
                </h2>
            </div>
            <div
                id="swish-div-open"
                className="collapse"
                aria-labelledby="swish-div"
                data-parent="#accordionExample"
            >
                <div className="border-top">
                    <div className="card-body text-center"></div>
                </div>
            </div>
        </div>
    );
};
const mapSateToProps = state => ({
    store_id: state.store?.store_id,
    user_info: state.payment?.userInfo,
    payment_info: state.payment?.paymentInfo,
    paymentOrderInfo: state.payment?.paymentOrderInfo
});
export default connect(mapSateToProps, {})(WayForPay);
