const isEmpty = value => (value || "") === "";

const basicValidation = value => {
    const fieldValue = value || "";
    if (isEmpty(fieldValue)) {
        return { isValid: false, error: "This field is required" };
    }
    return { isValid: true, error: null };
};

const cardNumberValidation = value => {
    const fieldValue = (value || "").replace(/[^0-9.]/g, "").replace(/ /g, "");
    const isValid = fieldValue.length === 16;
    if (!isValid) {
        return {
            isValid: false,
            error: "Please provide a valid credit card number"
        };
    }
    return { isValid: true, error: null };
};

const expiryDateValidation = value => {
    const fieldValue = (value || "").replace(/[^0-9.]/g, "").replace(/ /g, "");
    const month = fieldValue.substr(0, 2);
    const isMonthValid = month >= 1 && month <= 12;
    const year = fieldValue.substr(2, 6);
    const yearToday = new Date().getFullYear();
    const isYearValid = year > yearToday && year <= yearToday + 10;

    const isValid = isMonthValid && isYearValid;
    // if (!isValid) {
    //   return {
    //     isValid: false,
    //     error: "Provide a valid date"
    //   };
    // }
    return { isValid: true, error: null };
};

const cvcValidation = value => {
    const fieldValue = (value || "").replace(/[^0-9.]/g, "").replace(/ /g, "");
    const isValid = fieldValue.length === 3;
    if (!isValid) {
        return {
            isValid: false,
            error: "This field is required"
        };
    }
    return { isValid: true, error: null };
};

export const fieldsValidation = {
    cardNumber: cardNumberValidation,
    nameOnCard: basicValidation,
    expiryDate: expiryDateValidation,
    cvc: cvcValidation
};

export const validationTypes = {
    NOT_VALIDATED: "NOT_VALIDATED",
    PARTIALLY_VALIDATED: "PARTIALLY_VALIDATED",
    VALIDATED: "VALIDATED"
};
