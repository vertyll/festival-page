import Link from "next/link";
import Navbar from "../molecules/Navbar";
import styled from "styled-components";

const StyledHeader = styled.header`
  margin: 0 10px;
  background-color: var(--nav-color);
  //border-radius: 0 0 30px 30px;
  border-bottom: 1px solid var(--nav-border-bottom-color);
`;

const Logo = styled(Link)`
  color: var(--dark-text-color);
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
  align-items: center;
  padding: 20px 0;
`;

const SecondaryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Name = styled.span`
  font-size: 1.2em;
`

const Place = styled.span`
  font-size: 0.9em;
`

export default function Header() {
  return (
    <StyledHeader>
      <Wrapper>
          <LogoWrapper>
              <Logo href={"/"}><Name>SUNSET FESTIVAL</Name></Logo>
              <span>4 - 7.07.2024, <b>WARSZAWA</b></span>
              <Place>TOR WYŚCIGÓW KONNYCH SŁUŻEWIEC</Place>
          </LogoWrapper>
        <SecondaryWrapper>
          <Navbar />
        </SecondaryWrapper>
      </Wrapper>
    </StyledHeader>
  );
}
