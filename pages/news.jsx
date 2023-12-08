import DivCenter from "@/components/atoms/DivCenter";
import Title from "@/components/atoms/Title";
import NewsContainer from "@/components/organism/NewsContainer";
import Layout from "@/components/templates/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { News } from "@/models/News";
import Head from "next/head";
import TitleBanner from "@/components/atoms/TitleBanner";

export default function NewsPage({ news }) {
  return (
    <>
      <Head>
        <title>Newsy - Sunset Festival</title>
      </Head>
      <Layout>
        <TitleBanner imageUrl="/images/banernewsy.webp" />
        <DivCenter>
          <Title>Newsy</Title>
          {news && news.length > 0 ? (
            <NewsContainer news={news} />
          ) : (
            <p>Brak newsów do wyświetlenia</p>
          )}
        </DivCenter>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const news = await News.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      news: JSON.parse(JSON.stringify(news)),
    },
  };
}
