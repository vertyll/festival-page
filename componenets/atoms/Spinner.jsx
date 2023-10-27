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
  border: 0.70em solid var(--main-medium-slate-blue-color); // Szary kolor dla obwódki.
  border-top: 0.70em solid var(--nav-color); // Czarny kolor dla górnego obramowania.
  border-radius: 50%; // Sprawia, że spinner jest okrągły.
  width: 4em;
  height: 4em;
  animation: ${spin} 0.6s linear infinite; // Zastosowanie animacji obrotu.
`;

export default function Spinner() {
  return (
    <Wrapper>
      <StyledSpinner />
    </Wrapper>
  );
}
