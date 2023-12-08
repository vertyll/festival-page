import Link from "next/link";
import { useState, useContext } from "react";
import styled, { css } from "styled-components";
import { CartContext } from "../organism/CartContext";
import IconHamburger from "../atoms/IconHamburger";
import IconSearch from "../atoms/IconSearch";
import IconCart from "../atoms/IconCart";
import IconUser from "../atoms/IconUser";

const StyledDiv = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: var(--dark-text-color);
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

  ${(props) =>
    props.$size === "bold" &&
    css`
      font-weight: bold;
      font-size: 0.9em;

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

  @media (max-width: 985px) {
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
  color: var(--dark-text-color);
  cursor: pointer;

  @media (min-width: 985px) {
    display: none;
  }
`;

const MobileMenuWrapper = styled.div`
  display: none;

  @media (max-width: 985px) {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    background: var(--light-color);
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
  color: var(--dark-text-color);
  cursor: pointer;
`;

const CenterDiv = styled.div`
  display: flex;
  align-items: center;
`;

const PageOverlay = styled.div`
  display: none;

  @media (max-width: 985px) {
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
          <StyledLink href="/lineup" $size="bold">
            LINE-UP
          </StyledLink>
          <StyledLink href="/news" $size="bold">
            NEWSY
          </StyledLink>
          <StyledLink href="/products" $size="bold">
            SKLEP
          </StyledLink>
          <StyledLink href="/sponsors" $size="bold">
            SPONSORZY
          </StyledLink>
          <StyledLink href="/info" $size="bold">
            INFORMACJE
          </StyledLink>
          <StyledLink href="/search" $size="bold">
            <IconSearch />
          </StyledLink>
          <StyledLink href="/account">
            <IconUser />
            Konto
          </StyledLink>
          <StyledLink href="/cart">
            <IconCart />
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
          <StyledLink href="/search" $size="bold">
            <IconSearch />
          </StyledLink>
          <StyledLink href="/lineup" $size="bold">
            LINE-UP
          </StyledLink>
          <StyledLink href="/news" $size="bold">
            NEWSY
          </StyledLink>
          <StyledLink href="/products" $size="bold">
            SKLEP
          </StyledLink>
          <StyledLink href="/sponsors" $size="bold">
            SPONSORZY
          </StyledLink>
          <StyledLink href="/info" $size="bold">
            INFORMACJE
          </StyledLink>
          <StyledLink href="/account" $size="bold">
            Konto
          </StyledLink>
          <StyledLink href="/cart" $size="bold">
            Koszyk ({cartProducts.length})
          </StyledLink>
        </StyledNav>
      </MobileMenuWrapper>
    </StyledDiv>
  );
}
