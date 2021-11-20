const stripeCardInput = {
    iconStyle: "solid",
    style: {
      borderRadius:"10px",
      borderColor:"red",
      base: {

        iconColor: "#c4f0ff",
        color: "#00000",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#00000"
        },
        "::placeholder": {
          color: "#00000"
        }
      },
      invalid: {
        iconColor: "#00000",
        color: "#00000"
      }
    }
  };

  export {
    stripeCardInput
  }
