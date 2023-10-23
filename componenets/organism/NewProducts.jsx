import styled from "styled-components";
import DivCenter from "../atoms/DivCenter";
import ProductBox from "./ProductBox";

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 30px;
  padding-top: 30px;
`;

const Title = styled.h2``;

export default function NewProducts({ products }) {
  return (
    <DivCenter>
      <Title>Najnowsze produkty</Title>
      <ProductGrid>
        {products?.length > 0 &&
          products.map((product) => (
            <ProductBox key={product._id} {...product}></ProductBox>
          ))}
      </ProductGrid>
    </DivCenter>
  );
}
