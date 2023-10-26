import styled from "styled-components";
import FooterLinks from "../molecules/FooterLinks";

const StyledFooter = styled.footer`
  background-color: #222;
  color: #fff;
  margin: 0 auto;
  padding: 0 20px;
  height: 200px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px 0;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <Wrapper>
        <FooterLinks />
      </Wrapper>
    </StyledFooter>
  );
}
