/* eslint-disable @next/next/no-img-element */
import styled, { keyframes } from "styled-components";
import Link from "next/link";
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
  background-color: var(--hover-text-color);
  color: var(--light-text-color);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8em;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const Box = styled(Link)`
  background-color: var(--main-white-smoke-color);
  padding: 30px 10px;
  text-align: center;
  height: 100px;
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function SponsorBox({ _id, name, images, link:url }) {
  return (
    <Wrapper>
      <Box href={url}>
        <Image
          src={images?.[0] || "/images/no-image-found.webp"}
          alt=""
          fill={true}
          sizes="100vh"
          style={{
            objectFit: "cover",
          }}
          priority={false}
        />
        <HoverText>Przejdź do sponsora &#8594;</HoverText>
      </Box>
    </Wrapper>
  );
}
