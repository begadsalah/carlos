import React, { useEffect } from "react";
import Text from "../../../Containers/Text";
import { connect, useDispatch, useSelector } from "react-redux";
import ReactDOMServer from "react-dom/server";
import TextInput from "../../../Containers/TextInput";
import { useState } from "react/cjs/react.development";
import { applyCoupon } from "../../../../services/coupon/actions";

import PriceRender from "../../../Containers/PriceRender";
import { render } from "react-dom";
const ApplyCouponRender = props => {
    const Alert = useSelector(state => state?.alert);

    return (
        <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="display-flex text-success "
        >
            <div>
                <Text Key={"apply_coupon"} />
            </div>
            <div>
                - <PriceRender price={props.price} />
            </div>
        </div>
    );
};
const mapSateToProps = state => ({
    store: state.store,
    cart: state.cart,
    coupon: state.coupons.applied_coupon
});

export default connect(mapSateToProps, {})(ApplyCouponRender);
