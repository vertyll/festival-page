import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  border: 0;
  border-radius: 30px;
  padding: 5px 15px;
  transition: 0.5s;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  svg {
    height: 24px;
    margin-right: 5px;
  }

  &:hover {
    filter: brightness(0.85);
  }

  ${(props) =>
    props.usage === "primary" &&
    css`
      background-color: var(--main-maize-color);
    `}

  ${(props) =>
    props.usage === "danger" &&
    css`
      background-color: var(--main-danger-color);
    `}

  ${(props) =>
    props.usage === "quantity" &&
    css`
      background-color: var(--main-white-smoke-color);
    `}

  ${(props) =>
    props.size === "l" &&
    css`
      padding: 15px 35px;
      font-size: 1.2rem;
    `}

    ${(props) =>
    props.size === "m" &&
    css`
      padding: 10px 25px;
      font-size: 1rem;
    `}

  ${(props) =>
    props.size === "s" &&
    css`
      padding: 4px 14px;
      font-size: 1rem;
    `}
`;

export default function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}
