import styled from "styled-components";
import Button from "../atoms/Button";
import IconCreditCart from "../atoms/IconCreditCart";

const StyledDiv = styled.div`
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 525px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 50px;
  background-image: url("/images/baner.webp");
`;

const Title = styled.h1`
  margin: 0;
  font-weight: bold;
  font-size: 3em;
  font-family: "Almendra", serif;
  color: var(--light-color);
`;

export default function Banner() {
  return (
    <StyledDiv>
      <Title>Sunset Festival</Title>
      <Button $usage="primary" $size="l">
        <IconCreditCart />
        Kup bilet
      </Button>
    </StyledDiv>
  );
}
