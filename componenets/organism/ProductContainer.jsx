import styled from "styled-components";
import DivCenter from "../atoms/DivCenter";
import ProductBox from "./ProductBox";

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 50px;
  padding-top: 50px;
`;

export default function ProductContainer({ products }) {
  return (
    <DivCenter>
      <ProductGrid>
        {products?.length > 0 &&
          products.map((product) => (
            <ProductBox key={product._id} {...product}></ProductBox>
          ))}
      </ProductGrid>
    </DivCenter>
  );
}
