import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import ROUTE from "../../config/route";
// import domain from '../../config/api/domain';
import { connect, useDispatch, useSelector } from "react-redux";
import { triggerPayment } from "../../../services/payment/actions";
import * as CONSTANTS from "../../../config/constants/statusCodes";
import Text from "../../Containers/Text";
import { useHistory, useParams } from "react-router-dom";
import { CCForm } from "./CCForm";

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
  className,
  style,
}) => (
  <div className={className}>
    <label htmlFor={id} className="form-label font-weight-bold small">
      {label}
    </label>
    <input
      className="form-control"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      style={style}
    />
  </div>
);
const Payme = (props) => {
  const [email, setemail] = useState(null);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [modal, setmodal] = useState(false);
  const paymentInfo = useSelector((state) => state.payment.paymentInfo);
  const payme_mode = useSelector(
    (state) => state.store.payment_settings.PayMeMode
  );
  const store_id = useSelector((state) => state.store.store_id);
  const paymentOrderInfo = useSelector(
    (state) => state.payment?.paymentOrderInfo
  );
  const cartInfo = useSelector(
    (state) => state.checkout_payment?.paymentOrderInfo
  );
  const UserInfo = useSelector((state) => state.payment.userInfo);
  const history = useHistory();
  const Alert = useSelector((state) => state?.alert);

  useEffect(() => {
    if (paymentInfo.gateway == CONSTANTS.PAYME) {
      initiate_mercado_payment();
    }
  }, [paymentInfo]);

  useEffect(() => {
    if (paymentInfo.gateway == CONSTANTS.PAYME) {
      if (paymentOrderInfo.payme_sale_id) {
        setLoading(false);
        props.setLoading(false);
        setmodal(true);
      }
    }
  }, [paymentOrderInfo]);

  useEffect(() => {
    if (
      Alert.status_code == CONSTANTS.PAYMENT_ORDER_CREATED &&
      paymentInfo.gateway == CONSTANTS.PAYME
    ) {
      props.SuccessAction(CONSTANTS.PAYME, 2, "CHECKOUT");
    }
  }, [Alert && paymentOrderInfo]);

  useEffect(() => {
    if (
      Alert.status_code == CONSTANTS.PAYMENT_REDIRECT &&
      paymentInfo.gateway == CONSTANTS.PAYME
    ) {
      localStorage.setItem(
        "redirect_payment_id",
        paymentOrderInfo?.payme_sale_id
      );

      // window.location.href = paymentOrderInfo?.init_point;
      // window.location.href = `71b71a232dd170e70c1bffe8c8fe7a9d6a93684a?preference_id=${paymentOrderInfo?.payme_sale_id}&status=approved`;
    }
  }, [Alert && cartInfo]);

  useEffect(() => {
    if (Alert.status_code == "PAYMENT-400") {
      props.setLoading(false);
      alert(Alert.message);
    }
  }, [Alert]);
  const isPaid = () => {
    localStorage.setItem(
      "redirect_payment_id",
      paymentOrderInfo?.payme_sale_id
    );
    window.location.href = `${store_id}?preference_id=${paymentOrderInfo?.payme_sale_id}&status=approved`;
  };
  const trigger = () => {
    setLoading(true);
    props.onClick(CONSTANTS.PAYME);
  };

  const initiate_mercado_payment = () => {
    const { user_info, userData, payment_info } = props;
    let data = {
      store_id: store_id,
      user_info: { ...userData, email },
      payment_info: paymentInfo,
      redirect_back_url: window.location.href,
    };
    props.setLoading(true);
    if (paymentInfo.gateway == CONSTANTS.PAYME) dispatch(triggerPayment(data));
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  if (modal) {
    return (
      <CCForm
        onSuccess={() => isPaid()}
        cartInfo={cartInfo}
        email={email}
        paymentInfo={paymentInfo}
        paymentOrderInfo={paymentOrderInfo}
        onClose={() => setmodal(false)}
        mode={payme_mode}
      />
    );
  }

  return (
    <div
      className="osahan-card rounded shadow-sm bg-white mb-3"
      // onClick={() => trigger()}
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
            <i className="icofont-globe mr-3"></i> <Text Key={"payme"} />
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
          <div className="card-body text-center">
            <Field
              className="col-md-12 form-group"
              label={<Text Key={"email"} />}
              id="email"
              type="email"
              placeholder="janedoe@gmail.com"
              required
              autoComplete="email"
              // value={billingDetails.email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
        </div>
        <div className="fixed-bottom">
          <button
            onClick={() => trigger()}
            disabled={!validateEmail(email) && loading}
            className="btn btn-success btn-block btn "
          >
            <Text Key={"continue"} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Payme;
