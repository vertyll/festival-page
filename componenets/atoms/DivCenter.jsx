import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function DivCenter({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}
