import styled, { css } from "styled-components";

export const CardWrapper = styled.div`
    display: inline-block;
    position: relative;
    width: 380px;
    margin: 50px auto;
    padding: 36px;
    background: #fff;
    border-radius: 9px;
    text-align: left;
    box-shadow: 0 1px 16px rgba(0, 0, 0, 0.06);
`;

export const HalfSize = styled.div`
    display: inline-block;
    width: 50%;
    padding: 0 0 0 18px;

    ${props =>
        props.first &&
        css`
            padding: 0 18px 0 0;
        `}
`;

export const SubmitButton = styled.button`
    display: inline-block;
    width: 100%;
    margin: 7px 0 5px;
    padding: 15px;
    color: #fff;
    background: #1dcac4;
    border: 1px solid #1dcac4;
    border-radius: 3px;
    font-weight: bold;
    transition: all 0.2s ease;

    &:hover {
        background: #36eae4;
        border: 1px solid #36eae4;
        cursor: pointer;
    }
`;
