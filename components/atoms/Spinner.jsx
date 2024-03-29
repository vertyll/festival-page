import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSpinner = styled.div`
  border: 0.7em solid var(--main-medium-slate-blue-color);
  border-top: 0.7em solid var(--nav-color);
  border-radius: 50%;
  width: 4em;
  height: 4em;
  animation: ${spin} 0.6s linear infinite;
`;

export default function Spinner() {
  return (
    <Wrapper>
      <StyledSpinner />
    </Wrapper>
  );
}
