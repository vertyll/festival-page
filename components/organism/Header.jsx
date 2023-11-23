import Link from "next/link";
import Navbar from "../molecules/Navbar";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--nav-color);
  border-radius: 0 0 30px 30px;
`;

const Logo = styled(Link)`
  color: var(--light-text-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-family: 'Almendra', serif;
  font-size: 1.2em;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const SecondaryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Wrapper>
        <Logo href={"/"}>SUNSET FESTIVAL</Logo>
        <SecondaryWrapper>
          <Navbar />
        </SecondaryWrapper>
      </Wrapper>
    </StyledHeader>
  );
}
