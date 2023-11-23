import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: var(--light-text-color);
  text-decoration: none;
  margin: 0 15px;

  &:hover {
    text-decoration: underline;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const StyledP = styled.p`
  color: var(--main-maize-color);
`;

export default function FooterInfoLinks() {
  return (
    <Wrapper>
      <StyledP>Informacje:</StyledP>
      <StyledLink href="/privacypolicy" passHref>
        Polityka prywatności &#10138;
      </StyledLink>
      <StyledLink href="/termsofuse" passHref>
        Warunki użytkowania &#10138;
      </StyledLink>
      <StyledLink href="/regulations" passHref>
        Regulamin sklepu &#10138;
      </StyledLink>
      <StyledLink href="/bagpolicy" passHref>
        Bag Policy &#10138;
      </StyledLink>
    </Wrapper>
  );
}
