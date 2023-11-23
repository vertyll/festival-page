import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Layout from "@/components/templates/Layout";
import DivCenter from "@/components/atoms/DivCenter";
import ProductContainer from "@/components/organism/ProductContainer";
import Title from "@/components/atoms/Title";
import { WishedProduct } from "@/models/WishedProduct";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Head from "next/head";

export default function ProductsPage({ products, wishedProducts }) {
  return (
    <>
      <Head>
        <title>Produkty - Sunset Festival</title>
      </Head>
      <Layout>
        <DivCenter>
          <Title>Wszystkie produkty</Title>
          {products && products.length > 0 ? (
            <ProductContainer
              products={products}
              wishedProducts={wishedProducts}
            />
          ) : (
            <p>Brak produktów do wyświetlenia</p>
          )}
        </DivCenter>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session?.user.email,
        product: products.map((p) => p._id.toString()),
      })
    : [];
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      wishedProducts: wishedProducts.map((i) => i.product.toString()),
    },
  };
}
