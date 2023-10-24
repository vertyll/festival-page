import ProductContainer from "@/componenets/organism/ProductContainer";
import Banner from "@/componenets/organism/Banner";
import Layout from "@/componenets/templates/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import DivCenter from "@/componenets/atoms/DivCenter";
import Title from "@/componenets/atoms/Title";

export default function HomePage({ newProducts }) {
  return (
    <Layout>
      <Banner />
      <DivCenter>
        <Title>Nowe produkty</Title>
      <ProductContainer products={newProducts} />
      </DivCenter>
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
