import React, { useEffect, useState } from "react";
import * as s from "../../../../components/Input/hooks/App.style";

import "../../../../assets/css/cc_styles.css";
import Input from "../../../../components/Input/Input";
import useForm from "../../../../components/Input/hooks/useForm";

export const CCForm = (props) => {
  const [modal, setModal] = useState("block");
  const { fields, onChange, validate, onSubmit, ready, setReady } = useForm();

  useEffect(() => {
    if (ready) paymecheckout();
  }, [ready]);

  const paymecheckout = async () => {
    const postData = {
      payme_sale_id: props.paymentOrderInfo.payme_sale_id,
      sub_payme_id: props.paymentOrderInfo.payme_sale_id,
      installments: 1,
      credit_card_number: fields.cardNumber.value.replace(/\s/g, ""),
      credit_card_exp: fields.expiryDate.value,
      credit_card_cvv: fields.cvc.value,
      buyer_name: fields.nameOnCard.value,
      buyer_zip_code: 123,
      buyer_phone: props.cartInfo.customer_phone,
      buyer_email: props.email,
      language: "en",
      installment_plan_number: null,
    };

    const response = await fetch(
      "https://preprod.paymeservice.com/api/pay-sale",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(postData),
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.payme_sale_status == "completed") {
        props.onClose();
        props.onSuccess();
        setModal(null);
      } else if (data.payme_sale_status == "failed") {
        alert(data.status_error_details);
        setReady(false);
      }
    }
  };

  const renderData = () => (
    <s.CardWrapper>
      <span style={{ alignContent: "center" }}>
        you will pay : {props.paymentInfo.amount}
      </span>
      <form onSubmit={onSubmit}>
        <Input
          field={fields.cardNumber}
          name="cardNumber"
          label="Card number"
          format="creditCard"
          maxLength={22}
          onChange={onChange}
          validate={validate}
        />
        <Input
          field={fields.nameOnCard}
          name="nameOnCard"
          label="Name on card"
          onChange={onChange}
          validate={validate}
        />
        <s.HalfSize first>
          <Input
            field={fields.expiryDate}
            name="expiryDate"
            label="Expiry date"
            format="date"
            maxLength={7}
            onChange={onChange}
            validate={validate}
            placeholder="00/0000"
          />
        </s.HalfSize>
        <s.HalfSize>
          <Input
            field={fields.cvc}
            name="cvc"
            label="CVC"
            format="cvc"
            maxLength={3}
            onChange={onChange}
            validate={validate}
          />
        </s.HalfSize>
        <s.SubmitButton type="submit">Finish</s.SubmitButton>
      </form>
    </s.CardWrapper>
  );
  return (
    <>
      <div id="myModal" class="modal" style={{ display: modal }}>
        <div class="modal-content">
          <span
            class="close"
            onClick={() => {
              setModal(null);
              props.onClose();
            }}
          >
            &times;
          </span>
          {renderData()}
        </div>
      </div>
    </>
  );
};
