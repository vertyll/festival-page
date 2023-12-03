import styled from "styled-components";
import { RevealWrapper } from "next-reveal";
import NewsBox from "./NewsBox";

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  padding-top: 50px;

  @media screen and (min-width: 985px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default function NewsContainer({ news }) {
  return (
    <NewsGrid>
      {news?.length > 0 &&
        news.map((news, index) => (
          <RevealWrapper key={news._id} delay={index * 50}>
            <NewsBox key={news._id} {...news}></NewsBox>
          </RevealWrapper>
        ))}
    </NewsGrid>
  );
}
