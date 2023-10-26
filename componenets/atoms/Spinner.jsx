import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  ${(props) =>
    props.fullWidth
      ? `
    display:block;
    display:flex;
    justify-content:center;
  `
      : `
    border: 5xp solid blue;
  `}
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledSpinner = styled.div`
  border: 0.25em solid rgba(255, 255, 255, 0.2);
  border-top: 0.25em solid #3498db;
  border-radius: 50%;
  width: 2em;
  height: 2em;
  animation: ${spin} 2s linear infinite;
`;

export default function Spinner({ fullWidth }) {
  return (
    <Wrapper fullWidth={fullWidth}>
      <StyledSpinner />
    </Wrapper>
  );
}
