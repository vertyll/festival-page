/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import Button from "../atoms/Button";
import IconCart from "../atoms/IconCart";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "../organism/CartContext";
import IconHeart from "../atoms/IconHeart";
import IconHeartOutline from "../atoms/IconHeartOutline";
import axios from "axios";

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
  position: relative;

  img {
    max-width: 100%;
    max-height: 150px;
  }
`;

const WishlistButton = styled.button`
  border: 0;
  width: 40px !important;
  height: 40px;
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  cursor: pointer;
  ${(props) =>
    props.wished
      ? `
    color:red;
  `
      : `
    color:black;
  `}
  svg {
    width: 16px;
  }
`;

const Name = styled(Link)`
  font-weight: normal;
  margin: 0;
  text-decoration: none;
  color: inherit;
`;

const ProductInfo = styled.div`
  margin-top: 10px;
`;

const Price = styled.p`
`;

const Wrapper = styled.div``;

export default function ProductBox({
  _id,
  name,
  images,
  price,
  wished = false,
  onRemoveFromWishlist = () => {},
}) {
  const { addProduct } = useContext(CartContext);
  const url = "/product/" + _id;
  const [isWished, setIsWished] = useState(wished);
  function addToWishlist(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const nextValue = !isWished;
    if (nextValue === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(_id);
    }
    axios
      .post("/api/wishlist", {
        product: _id,
      })
      .then(() => {});
    setIsWished(nextValue);
  }

  return (
    <Wrapper>
      <Box href={url}>
        <div>
          <WishlistButton wished={isWished} onClick={addToWishlist}>
            {isWished ? <IconHeart /> : <IconHeartOutline />}
          </WishlistButton>
          <img src={images?.[0]} alt="" />
        </div>
      </Box>
      <ProductInfo>
        <Name href={url}>{name}</Name>
        <Price>
          Cena: <b>{price}</b> zł
        </Price>
        <Button onClick={() => addProduct(_id)} size="m" usage="primary">
          <IconCart />
          Dodaj do koszyka
        </Button>
      </ProductInfo>
    </Wrapper>
  );
}
