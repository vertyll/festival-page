import styled from "styled-components";
import Button from "../atoms/Button";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 20px 20px;
  background-color: gray;
  height: 500px;
`;

const Title = styled.h1`
  margin: 0;
  font-family: 'Concert One', sans-serif;
`;

const Description = styled.p`
  color: #fff;
  font-size: 1rem;
`;

export default function Banner() {
  return (
    <StyledDiv>
      <Title>Sunset Festival</Title>
      <Description>
        Tutaj będzie jakiś opis
      </Description>
      <Button usage="primary" size="l">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
          />
        </svg>
        Kup bilet
      </Button>
    </StyledDiv>
  );
}
