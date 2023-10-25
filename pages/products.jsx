import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Layout from "@/componenets/templates/Layout";
import DivCenter from "@/componenets/atoms/DivCenter";
import ProductContainer from "@/componenets/organism/ProductContainer";
import Title from "@/componenets/atoms/Title";
import { WishedProduct } from "@/models/WishedProduct";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default function ProductsPage({ products, wishedProducts }) {
  return (
    <>
      <Layout>
        <DivCenter>
          <Title>Wszystkie produkty</Title>
          <ProductContainer
            products={products}
            wishedProducts={wishedProducts}
          />
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
