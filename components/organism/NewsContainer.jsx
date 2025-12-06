import styled from "styled-components";
import RevealWrapper from "@/components/atoms/RevealWrapper";
import NewsBox from "./NewsBox";

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  padding-top: 50px;
  justify-items: center; /* Wyśrodkowanie pojedynczego elementu */

  @media screen and (min-width: 985px) {
    grid-template-columns: ${({ $newsCount }) => ($newsCount === 1 ? "1fr" : "1fr 1fr")};
  }
`;

export default function NewsContainer({ news }) {
  return (
    <NewsGrid $newsCount={news?.length}>
      {news?.length > 0 &&
        news.map((newsItem, index) => (
          <RevealWrapper key={newsItem._id} delay={index * 50}>
            <NewsBox key={newsItem._id} {...newsItem}></NewsBox>
          </RevealWrapper>
        ))}
    </NewsGrid>
  );
}
