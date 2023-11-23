import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  display: block;
  font-size: 1rem;
  color: var(--main-night-color);
`;

export default function Label({ children, ...props }) {
  return <StyledLabel {...props}>{children}</StyledLabel>;
}
