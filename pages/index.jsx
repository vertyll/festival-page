import ProductContainer from "@/components/organism/ProductContainer";
import Banner from "@/components/organism/Banner";
import Layout from "@/components/templates/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import DivCenter from "@/components/atoms/DivCenter";
import Title from "@/components/atoms/Title";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { Artist } from "@/models/Artist";
import { News } from "@/models/News";
import NewsContainer from "@/components/organism/NewsContainer";
import Head from "next/head";
import ArtistContainerForHomePage from "@/components/organism/ArtistContainerForHomePage";
import Newsletter from "@/components/organism/Newsletter";

export default function HomePage({
  newProducts,
  wishedNewProducts,
  newArtists,
  newNews,
}) {
  return (
    <>
      <Head>
        <title>Strona główna - Sunset Festival</title>
      </Head>
      <Layout>
        <Banner />
        <DivCenter>
          {newArtists && newArtists.length > 0 && (
            <>
              <Title>Nowo ogłoszeni artyści</Title>
              <ArtistContainerForHomePage artists={newArtists} />
            </>
          )}

          {newProducts && newProducts.length > 0 && (
            <>
              <Title>Nowe produkty</Title>
              <ProductContainer
                products={newProducts}
                wishedProducts={wishedNewProducts}
              />
            </>
          )}

          {newNews && newNews.length > 0 && (
            <>
              <Title>Nowe newsy</Title>
              <NewsContainer news={newNews} />
            </>
          )}
        </DivCenter>
        <Newsletter />
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 8,
  });
  const newArtists = await Artist.find({}, null, {
    sort: { _id: -1 },
    limit: 4,
  });
  const newNews = await News.find({}, null, {
    sort: { _id: -1 },
    limit: 2,
  });
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedNewProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session.user.email,
        product: newProducts.map((p) => p._id.toString()),
      })
    : [];
  return {
    props: {
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map((i) => i.product.toString()),
      newArtists: JSON.parse(JSON.stringify(newArtists)),
      newNews: JSON.parse(JSON.stringify(newNews)),
    },
  };
}
