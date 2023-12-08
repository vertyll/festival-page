import { mongooseConnect } from "@/lib/mongoose";
import styled from "styled-components";
import Layout from "@/components/templates/Layout";
import SingleBox from "@/components/atoms/SingleBox";
import NewsImage from "@/components/organism/NewsImage";
import { formatDate } from "@/utils/date";
import Head from "next/head";
import { News } from "@/models/News";

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    gap: 20px;
    //margin-top: 50px;

    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const Row = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column;
    margin: 0 30px 0 30px;

    @media screen and (min-width: 768px) {
        margin: 0 30px 0 0;
    }
`;

const Title = styled.h1`
    font-size: 2em;
`;

export default function NewsPage({ news }) {
  return (
    <>
      <Head>
        <title>{news.name} - Sunset Festival</title>
      </Head>
      <Layout>
          <ColWrapper>
            <SingleBox>
              <NewsImage images={news.images} />
            </SingleBox>
            <Row>
              <Title>{news.name}</Title>
              <div><b>Opublikowano:</b> {formatDate(news.createdAt)}</div>
              {news.description && (
                <>
                  {news.description}
                </>
              )}
            </Row>
          </ColWrapper>
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
