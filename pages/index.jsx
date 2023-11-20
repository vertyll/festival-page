import ProductContainer from "@/componenets/organism/ProductContainer";
import Banner from "@/componenets/organism/Banner";
import Layout from "@/componenets/templates/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import DivCenter from "@/componenets/atoms/DivCenter";
import Title from "@/componenets/atoms/Title";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import ArtistContainer from "@/componenets/organism/ArtistContainer";
import { Artist } from "@/models/Artist";
import { News } from "@/models/News";
import NewsContainer from "@/componenets/organism/NewsContainer";

export default function HomePage({
  newProducts,
  wishedNewProducts,
  newArtists,
  newNews,
}) {
  return (
    <Layout>
      <Banner />
      <DivCenter>
        <Title>Nowo ogłoszeni artyści</Title>
        <ArtistContainer artists={newArtists} />
        <Title>Nowe produkty</Title>
        <ProductContainer
          products={newProducts}
          wishedProducts={wishedNewProducts}
        />
        <Title>Nowe newsy</Title>
        <NewsContainer news={newNews} />
      </DivCenter>
    </Layout>
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
