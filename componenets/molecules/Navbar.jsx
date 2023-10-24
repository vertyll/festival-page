import Link from "next/link";
import { useContext } from "react";
import styled, { css } from "styled-components";
import { CartContext } from "../organism/CartContext";

const StyledDiv = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const StyledLink = styled(Link)`
  color: var(--main-maize-color);
  text-decoration: none;

  svg {
    height: 24px;
  }

  ${(props) =>
    props.usage === "special" &&
    css`
      background-color: var(--main-medium-slate-blue-color);
      color: var(--main-maize-color);
      border: 0;
      border-radius: 30px;
      padding: 12px 24px;
      transition: 0.5s;

      &:hover {
        filter: brightness(0.85);
      }
    `}
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export default function Navbar() {
  const { cartProducts } = useContext(CartContext);
  return (
    <StyledDiv>
      <StyledNav>
        <StyledLink href={"/lineup"}>Line up</StyledLink>
        <StyledLink href={"/products"}>Sklep</StyledLink>
        <StyledLink href={"/categories"}>Kategorie</StyledLink>
        <StyledLink href={"/contact"}>Kontakt</StyledLink>
        <StyledLink href={"/map"}>Mapa</StyledLink>
        <StyledLink usage="special" href={"/account"}>
          Konto
        </StyledLink>
        <StyledLink usage="special" href={"/cart"}>
          Koszyk ({cartProducts.length})
        </StyledLink>
      </StyledNav>
    </StyledDiv>
  );
}
