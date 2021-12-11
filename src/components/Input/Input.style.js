import styled, { css } from "styled-components";

export const InputWrapper = styled.div`
  position: relative;
`;

export const Label = styled.label`
  display: block;
  padding-bottom: 6px;
  color: #606673;
`;

export const Input = styled.input`
  position: relative;
  width: 100%;
  margin: 0 0 30px;
  padding: 12px;
  border: 1px solid #eaebee;
  border-radius: 3px;
  color: #1b1b1b;

  &:focus {
    border: 1px solid #1dcac4;
  }

  ${(props) =>
    props.error &&
    css`
      border: 1px solid #e81a1a;
    `}
`;

export const Error = styled.div`
  position: absolute;
  bottom: 12px;
  font-size: 12px;
  color: #e81a1a;
`;

export const ErrorIcon = styled.div`
  position: absolute;
  bottom: 37px;
  right: 10px;
  font-size: 23px;
  color: #e81a1a;
`;
