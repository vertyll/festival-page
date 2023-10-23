import NewProducts from "@/componenets/organism/NewProducts";
import Banner from "@/componenets/organism/Banner";
import Layout from "@/componenets/templates/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({ newProducts }) {
  return (
    <Layout>
      <Banner />
      <NewProducts products={newProducts} />
    </Layout>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 8,
  });
  return {
    props: {
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
