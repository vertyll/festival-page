import { mongooseConnect } from "@/lib/mongoose";
import styled from "styled-components";
import DivCenter from "@/componenets/atoms/DivCenter";
import Layout from "@/componenets/templates/Layout";
import Title from "@/componenets/atoms/Title";
import SingleBox from "@/componenets/atoms/SingleBox";
import { News } from "@/models/news";
import NewsImage from "@/componenets/organism/NewsImage";
import { formatDate } from "@/utils/date";
import Head from "next/head";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 920px;
  width: 100%;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 5px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

const StyledDescriptionDiv = styled.div`
  display: flex;
  max-width: 850px;
  border-radius: 20px;
  background-color: var(--light-color);
  box-shadow: var(--default-box-shadow);
  padding: 30px;
`;

export default function NewsPage({ news }) {
  return (
    <>
      <Head>
        <title>{news.name} - Sunset Festival</title>
      </Head>
      <Layout>
        <DivCenter>
          <ColWrapper>
            <SingleBox>
              <NewsImage images={news.images} />
            </SingleBox>
            <Row>
              <Title>{news.name}</Title>
              <div>Opublikowano: {formatDate(news.createdAt)}</div>
            </Row>
          </ColWrapper>
          {news.description && (
            <>
              <StyledDescriptionDiv>{news.description}</StyledDescriptionDiv>
            </>
          )}
        </DivCenter>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const news = await News.findById(id);

  return {
    props: {
      news: JSON.parse(JSON.stringify(news)),
    },
  };
}
