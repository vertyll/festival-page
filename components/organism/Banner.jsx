import styled from "styled-components";
import Button from "../atoms/Button";
import IconCreditCart from "../atoms/IconCreditCart";
import { useRouter } from "next/router";

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
  text-shadow: 3px 3px 6px rgba(14, 14, 14, 1);
`;

export default function Banner() {
  const router = useRouter();

  const goToShop = () => {
    router.push("/products");
  };
  return (
    <StyledDiv>
      <Title>Sunset Festival</Title>
      <Button $usage="primary" $size="l" onClick={goToShop}>
        <IconCreditCart />
        Kup bilet
      </Button>
    </StyledDiv>
  );
}
