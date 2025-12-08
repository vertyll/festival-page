import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.$padding || "20px 0"};
`;

const StyledSpinner = styled.div`
  border: ${(props) => props.$borderWidth || "0.7em"} solid var(--main-medium-slate-blue-color);
  border-top: ${(props) => props.$borderWidth || "0.7em"} solid var(--nav-color);
  border-radius: 50%;
  width: ${(props) => props.$size || "4em"};
  height: ${(props) => props.$size || "4em"};
  animation: ${spin} 0.6s linear infinite;
`;

export default function Spinner({ size, borderWidth, padding }) {
  return (
    <Wrapper $padding={padding}>
      <StyledSpinner $size={size} $borderWidth={borderWidth} />
    </Wrapper>
  );
}
