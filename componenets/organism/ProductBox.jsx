/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import Button from "../atoms/Button";
import IconCart from "../atoms/IconCart";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../organism/CartContext";

const Box = styled(Link)`
  background-color: white;
  padding: 20px;
  height: 150px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: inherit;
  border-radius: 30px;
  img {
    max-width: 100%;
    max-height: 150px;
  }
`;

const Name = styled(Link)`
  font-weight: normal;
  margin: 0;
  text-decoration: none;
  color: inherit;
`;

const ProductInfoBox = styled.div`
  margin-top: 10px;
`;

const Price = styled.p``;

const Wrapper = styled.div``;

export default function ProductBox({ _id, name, images, description, price }) {
  const url = "/product/" + _id;
  const { addProduct } = useContext(CartContext);

  return (
    <Wrapper>
      <Box href={url}>
        <img src={images[0]} alt="zdjęcie produktu"></img>
      </Box>
      <ProductInfoBox>
        <Name href={url}>{name}</Name>
        <Price>
          Cena: <b>{price}</b> zł
        </Price>
        <Button onClick={() => addProduct(_id)} size="m" special="primary">
          <IconCart />
          Dodaj do koszyka
        </Button>
      </ProductInfoBox>
    </Wrapper>
  );
}
