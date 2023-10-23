import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  border: 0;
  border-radius: 30px;
  padding: 5px 15px;
  transition: 0.5s;
  display: inline-flex;
  align-items: center;
  svg {
    height: 24px;
    margin-right: 5px;
  }

  cursor: pointer;
  &:hover {
    filter: brightness(0.85);
  }

  ${(props) =>
    props.special === "primary" &&
    css`
      background-color: var(--main-maize-color);
    `}

  ${(props) =>
    props.special === "danger" &&
    css`
      background-color: #ff0000;
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
`;

export default function Button({ onClick, children, ...props }) {
  return (
    <StyledButton onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
}
