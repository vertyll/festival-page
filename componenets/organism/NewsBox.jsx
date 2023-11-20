/* eslint-disable @next/next/no-img-element */
import styled, { css, keyframes } from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/date";

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
  background-color: #000000bc;
  color: white;
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 0.8em;
  opacity: 0; // Initially hidden
  transition: opacity 0.3s ease-in-out; // Smooth transition for opacity
  animation: ${fadeIn} 0.3s ease-in-out; // Apply the fade-in animation
`;

const Box = styled(Link)`
  background-color: var(--lavender-color);
  padding: 30px 10px;
  height: 100px;
  width: 170px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: inherit;
  position: relative;

  &:hover ${HoverText} {
    display: block;
    opacity: 1;
  }
`;

const Name = styled(Link)`
  font-weight: bold;
  font-size: 1.2em;
  margin: 0;
  text-decoration: none;
  color: inherit;
`;

const NewsInfo = styled.div`
  margin-top: 10px;
  display: flex;
`;

const Wrapper = styled.div`
  background-color: white;
  padding: 20px;
  box-shadow: var(--default-box-shadow);
`;

const NewsName = styled.div`
  margin: 5px 0;
`;

const NewsDate = styled(Link)`
  font-weight: bold;
  font-size: 0.9em;
  margin: 0;
  text-decoration: none;
  color: inherit;
`;

export default function NewsBox({ _id, name, images }) {
  const url = "/news/" + _id;

  return (
    <Wrapper>
      <NewsName>
        <Name href={url}>{name}</Name>
      </NewsName>
      <Box href={url}>
        <Image
          src={images?.[0] || "/no-image-found.png"}
          alt=""
          fill={true}
          sizes="100vh"
          style={{
            objectFit: "cover",
          }}
          priority={false}
        />
        <HoverText>Przeczytaj newsa &#8594;</HoverText>
      </Box>
    </Wrapper>
  );
}
