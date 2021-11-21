const returnOnlyNumbers = (value) => value.replace(/[^0-9.]/g, "");

const creditCard = (value) => {
  const onlyNumbers = returnOnlyNumbers(value);
  const numberOfChars = onlyNumbers.length;

  if (numberOfChars > 12) {
    return onlyNumbers.replace(
      /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4}).*/,
      "$1  $2  $3  $4"
    );
  }

  if (numberOfChars > 8) {
    return onlyNumbers.replace(/^(\d{0,4})(\d{0,4})(\d{0,4}).*/, "$1  $2  $3");
  }

  if (numberOfChars > 4) {
    return onlyNumbers.replace(/^(\d{0,4})(\d{0,4}).*/, "$1  $2");
  }

  return onlyNumbers;
};

const date = (value) => {
  const onlyNumbers = returnOnlyNumbers(value);
  const numberOfChars = onlyNumbers.length;

  if (numberOfChars > 2) {
    return onlyNumbers.replace(/^(\d{0,2})(\d{0,4}).*/, "$1/$2");
  }

  return onlyNumbers;
};

const cvc = (value) => returnOnlyNumbers(value);

const masks = {
  creditCard,
  date,
  cvc
};

export default masks;
