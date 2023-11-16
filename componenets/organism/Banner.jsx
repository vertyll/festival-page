import styled from "styled-components";
import Button from "../atoms/Button";
import IconCreditCart from "../atoms/IconCreditCart";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 20px;
  background-color: var(--gray-color);
  height: 500px;
  border-radius: 30px;
  box-shadow: var(--default-box-shadow);
`;

const Title = styled.h1`
  margin: 0;
  font-family: "Concert One", sans-serif;
`;

const Description = styled.p`
  color: var(--light-text-color);
  font-size: 1rem;
`;

export default function Banner() {
  return (
    <StyledDiv>
      <Title>Sunset Festival</Title>
      <Description>Tutaj będzie jakiś opis</Description>
      <Button $usage="primary" $size="l">
        <IconCreditCart />
        Kup bilet
      </Button>
    </StyledDiv>
  );
}
