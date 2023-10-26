import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: #222;
  color: #fff;
  margin: 0 auto;
  padding: 0 20px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const SecondaryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <Wrapper>
        test
        <SecondaryWrapper>test</SecondaryWrapper>
      </Wrapper>
    </StyledFooter>
  );
}
