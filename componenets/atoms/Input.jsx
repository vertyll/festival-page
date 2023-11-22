import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid var(--main-night-color);
  border-radius: 20px;
  box-sizing: border-box;

  &:hover {
    border: 1px solid var(--main-medium-slate-blue-color);
  }
`;

export default function Input(props) {
  return <StyledInput {...props} />;
}
