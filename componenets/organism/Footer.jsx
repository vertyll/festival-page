import styled from "styled-components";
import FooterInfoLinks from "../molecules/FooterInfoLinks";

const StyledFooter = styled.footer`
  background-color: var(--nav-color);
  color: var(--light-text-color);
  margin: 0 auto;
  padding: 0 20px;
  height: 200px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <Wrapper>
        <FooterInfoLinks />
      </Wrapper>
    </StyledFooter>
  );
}
