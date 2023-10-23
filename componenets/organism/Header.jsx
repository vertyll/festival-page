import Link from "next/link";
import Navbar from "../molecules/Navbar";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const SeccondaryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Wrapper>
        <Logo href={"/"}>SUNSET FESTIVAL</Logo>
        <SeccondaryWrapper>
          <Navbar />
        </SeccondaryWrapper>
      </Wrapper>
    </StyledHeader>
  );
}
