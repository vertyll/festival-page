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

export default function HomePage({
  newProducts,
  wishedNewProducts,
  newArtists,
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
    },
  };
}
