import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 10px 0 10px;
`;

export default function DivCenter({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}
