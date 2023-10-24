import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import Layout from "@/componenets/templates/Layout";
import DivCenter from "@/componenets/atoms/DivCenter";
import ProductContainer from "@/componenets/organism/ProductContainer";
import Title from "@/componenets/atoms/Title";

export default function ProductsPage({products}) {
    return (
        <>
            <Layout>
            <DivCenter>
                <Title>Wszystkie produkty</Title>
                <ProductContainer products={products} />
            </DivCenter>
            </Layout>
        </>
    );
}

export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{'_id':-1}});
    return {
        props:{
            products: JSON.parse(JSON.stringify(products)),
        }
    };
}