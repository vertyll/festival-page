import styled from "styled-components";

const StyledDiv = styled.div`
  color: var(--main-danger-color);
  background-color: var(--error-bg-color);
  border-radius: 20px;
  margin: 2px 0;
  padding: 2px 10px 2px 10px;
  max-width: max-content;
`;

export default function ErrorDiv({ children, ...props }) {
  return <StyledDiv {...props}>{children}</StyledDiv>;
}
