import styled from "styled-components";

const StyledDiv = styled.div`
  text-align: left;
  padding: 0 50px;
  margin: 0 50px;

  @media screen and (max-width: 768px) {
    padding: 0;
    margin: 0;
  }
`;

export default function DivText({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}
