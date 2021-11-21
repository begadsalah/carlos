import { useState } from "react";
import { fieldsValidation } from "../utils/validations";

function useForm() {
    const [fields, setFields] = useState({});
    const [ready, setReady] = useState(false);
    const updateFieldObject = (field, values) => {
        setFields(prevState => ({
            ...prevState,
            [field]: {
                ...(prevState[field] || {}),
                ...values
            }
        }));
    };

    const onChange = (event, value) => {
        const { name } = event.target;
        const values = { value, error: null };
        updateFieldObject(name, values);
    };

    const validate = event => {
        const { name } = event.target;
        const fieldValue = fields[name]?.value || "";
        const { isValid, error } = fieldsValidation[name](fieldValue);
        const values = {
            validated: isValid,
            error: isValid ? null : error
        };
        updateFieldObject(name, values);
    };

    const onSubmit = event => {
        if (event) event.preventDefault();
        Object.keys(fieldsValidation).forEach(field => {
            validate({
                target: {
                    name: field,
                    value: fields[field]?.value
                }
            });
        });

        const hasErrors =
            Object.keys(fieldsValidation).filter(
                field => fields[field]?.error !== null
            ).length > 0;

        if (!hasErrors) {
            setReady(true);
            // some callback to submit form
        }
    };

    return { fields, onChange, validate, onSubmit, ready, setReady };
}

export default useForm;
