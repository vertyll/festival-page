import Link from "next/link";
import { useState, useContext } from "react";
import styled, { css } from "styled-components";
import { CartContext } from "../organism/CartContext";
import IconHamburger from "../atoms/IconHamburger";

const StyledDiv = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const StyledLink = styled(Link)`
  color: var(--main-maize-color);
  text-decoration: none;
  cursor: pointer;
  svg {
    height: 24px;
  }

  ${(props) =>
    props.$usage === "special" &&
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

  @media (max-width: 768px) {
    display: block;
    padding: 10px 20px;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    display: ${(props) => (props.$open ? "flex" : "none")};
    flex-direction: column;
    width: 100%;
    margin-top: 25px;
    gap: 10px;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  border: none;
  width: 45px;
  height: 45px;
  color: var(--light-color);
  cursor: pointer;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileMenuWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    background: var(--nav-color);
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    z-index: 2;

    ${(props) =>
      props.$open &&
      css`
        transform: translateX(0);
      `}
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background-color: transparent;
  border: none;
  width: 45px;
  height: 45px;
  color: var(--light-color);
  cursor: pointer;
`;

const CenterDiv = styled.div`
  display: flex;
  align-items: center;
`;

const PageOverlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    ${(props) =>
      props.$open &&
      css`
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1;
      `}
  }
`;

export default function Navbar() {
  const { cartProducts } = useContext(CartContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <StyledDiv>
      <CenterDiv>
        <StyledNav>
          <StyledLink href="/products">Sklep</StyledLink>
          <StyledLink href="/account" $usage="special">Konto</StyledLink>
          <StyledLink href="/cart" $usage="special">
            Koszyk ({cartProducts.length})
          </StyledLink>
        </StyledNav>
        <NavButton onClick={toggleMobileMenu}>
          <IconHamburger />
        </NavButton>
      </CenterDiv>
      <PageOverlay $open={isMobileMenuOpen} onClick={toggleMobileMenu} />
      <MobileMenuWrapper $open={isMobileMenuOpen}>
        {isMobileMenuOpen && (
          <CloseButton onClick={toggleMobileMenu}>
            <IconHamburger />
          </CloseButton>
        )}

        <StyledNav $open={isMobileMenuOpen}>
          <StyledLink href="/products">Sklep</StyledLink>
          <StyledLink href="/account">Konto</StyledLink>
          <StyledLink href="/cart">
            Koszyk ({cartProducts.length})
          </StyledLink>
        </StyledNav>
      </MobileMenuWrapper>
    </StyledDiv>
  );
}
