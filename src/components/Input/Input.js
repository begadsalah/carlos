import React from "react";
import PropTypes from "prop-types";
import * as s from "./Input.style";

// Utils
import masks from "./utils/masks";

const Input = ({
    field,
    name,
    label,
    format,
    maxLength,
    onChange,
    validate,
    placeholder
}) => {
    const value = field?.value || "";
    const error = field?.error || null;

    const handleChange = e => {
        const saveDefault = () => {
            onChange(e, e.target.value);
        };

        const applyMask = () => {
            const maskedValue = masks[format](e.target.value);
            onChange(e, maskedValue);
        };

        const checkInputFormat = () => {
            return format ? applyMask() : saveDefault();
        };

        checkInputFormat();
    };

    return (
        <s.InputWrapper>
            <s.Label htmlFor={name}>{label}</s.Label>
            <s.Input
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={validate}
                maxLength={maxLength}
                placeholder={placeholder}
                error={error}
            />
            {error && (
                <>
                    <s.Error>{error}</s.Error>
                    <s.ErrorIcon>&#9888;</s.ErrorIcon>
                </>
            )}
        </s.InputWrapper>
    );
};

Input.propTypes = {
    field: PropTypes.shape({
        value: PropTypes.string,
        error: PropTypes.string
    }),
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    format: PropTypes.string,
    maxLength: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

Input.defaultProps = {
    format: null,
    maxLength: 100,
    placeholder: ""
};

export default Input;
