import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 15px;

  &:hover {
    text-decoration: underline;
  }
`;
export default function FooterLinks() {
  return (
    <>
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
    </>
  );
}
