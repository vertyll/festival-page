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
      <StyledLink href="/privacy-policy" passHref>
        Polityka prywatności
      </StyledLink>
      <StyledLink href="/terms-of-use" passHref>
        Warunki użytkowania
      </StyledLink>
      <StyledLink href="/regulations" passHref>
        Regulamin
      </StyledLink>
      <StyledLink href="/bag-policy" passHref>
        Bag Policy
      </StyledLink>
    </Wrapper>
  );
}
