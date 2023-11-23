/* eslint-disable @next/next/no-img-element */
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "../organism/CartContext";
import IconHeart from "../atoms/IconHeart";
import IconHeartOutline from "../atoms/IconHeartOutline";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Alert } from "../atoms/Alert";
import Image from "next/image";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;

const HoverText = styled.div`
  display: none;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--main-night-color);
  color: var(--light-text-color);
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 0.8em;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const Box = styled(Link)`
  background-color: white;
  padding: 30px 10px;
  text-align: center;
  height: 150px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: inherit;
  position: relative;
  box-shadow: var(--default-box-shadow);

  &:hover ${HoverText} {
    display: block;
    opacity: 1;
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
  z-index: 1;
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function ProductBox({
  _id,
  name,
  images,
  price,
  wished = false,
  onRemoveFromWishlist = () => {},
}) {
  // const { addProduct } = useContext(CartContext);
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
        <WishlistButton
          $wished={isWished}
          onClick={(e) => addToWishlist(e, session)}
        >
          {isWished ? <IconHeart /> : <IconHeartOutline />}
        </WishlistButton>
        <Image
          src={images?.[0] || "/no-image-found.webp"}
          alt=""
          fill={true}
          sizes="100vh"
          style={{
            objectFit: "cover",
          }}
          priority={false}
        />
        <HoverText>Zobacz produkt &#8594;</HoverText>
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
