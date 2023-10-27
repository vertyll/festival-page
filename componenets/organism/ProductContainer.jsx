import styled from "styled-components";
import ProductBox from "./ProductBox";
import { RevealWrapper } from "next-reveal";

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  padding-top: 50px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function ProductContainer({ products, wishedProducts = [] }) {
  return (
      <ProductGrid>
        {products?.length > 0 &&
          products.map((product, index) => (
            <RevealWrapper key={product._id} delay={index * 50}>
              <ProductBox
                key={product._id}
                {...product}
                wished={wishedProducts.includes(product._id)}
              ></ProductBox>
            </RevealWrapper>
          ))}
      </ProductGrid>
  );
}
