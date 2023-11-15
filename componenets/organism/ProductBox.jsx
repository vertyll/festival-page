/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "../organism/CartContext";
import IconHeart from "../atoms/IconHeart";
import IconHeartOutline from "../atoms/IconHeartOutline";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Alert } from "../atoms/Alert";

const Box = styled(Link)`
  background-color: white;
  padding: 25px;
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
  color: ${(props) => (props.$wished ? "red" : "black")};
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

const Price = styled.p``;

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
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const alertDuration = 3000;
  const { data: session } = useSession();
  const url = "/product/" + _id;
  const [isWished, setIsWished] = useState(wished);
  function addToWishlist(e, session) {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      setAlertMessage(
        "Musisz być zalogowany, aby dodać produkt do listy życzeń."
      );
      setShowAlert(true);
      return;
    }

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
      {showAlert && (
        <Alert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
          duration={alertDuration}
          type="danger"
        />
      )}
      <Box href={url}>
        <div>
          <WishlistButton
            $wished={isWished}
            onClick={(e) => addToWishlist(e, session)}
          >
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
      </ProductInfo>
    </Wrapper>
  );
}
