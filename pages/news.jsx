import DivCenter from "@/componenets/atoms/DivCenter";
import Title from "@/componenets/atoms/Title";
import NewsContainer from "@/componenets/organism/NewsContainer";
import Layout from "@/componenets/templates/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { News } from "@/models/News";

export default function NewsPage({ news }) {
  return (
    <Layout>
      <DivCenter>
        <Title>Newsy</Title>
        {news && news.news > 0 ? (
          <NewsContainer news={news} />
        ) : (
          <p>Brak newsów do wyświetlenia</p>
        )}
      </DivCenter>
    </Layout>
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