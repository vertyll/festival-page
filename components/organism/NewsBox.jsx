/* eslint-disable @next/next/no-img-element */
import styled, { keyframes } from "styled-components";
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
  background-color: var(--hover-text-color);
  color: var(--light-text-color);
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 0.8em;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const Box = styled.div`
  background-color: var(--main-white-smoke-color);
  padding: 30px 10px;
  height: 350px;
  width: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: inherit;
  position: relative;

  @media screen and (min-width: 480px) {
    width: 250px;
  }
  
  @media screen and (min-width: 985px) {
    width: 350px;
  }
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 1.2em;
  margin: 0;
  text-decoration: none;
  color: inherit;
`;

const NewsInfo = styled.div`
  margin-top: 20px;
  display: flex;
`;

const Wrapper = styled(Link)`
  background-color: var(--main-white-smoke-color);
  box-shadow: var(--default-box-shadow);
  display: flex;
  gap: 10px;
  padding-right: 10px;
  text-decoration: none;
  color: inherit;
  &:hover ${HoverText} {
    display: block;
    opacity: 1;
  }
`;

const NewsName = styled.div`
  margin: 25px 0;
`;

const NewsDate = styled.div`
  font-weight: bold;
  font-size: 0.9em;
  margin: 0;
  text-decoration: none;
  color: inherit;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function NewsBox({ _id, name, images, createdAt }) {
  const url = "/news/" + _id;

  return (
    <Wrapper href={url}>
      <Box>
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
      </Box>
      <InfoWrapper>
        <NewsInfo>
          <NewsDate>{formatDate(createdAt)}</NewsDate>
        </NewsInfo>
        <NewsName>
          <Name>{name}</Name>
        </NewsName>
      </InfoWrapper>
      <HoverText>Przeczytaj newsa &#8594;</HoverText>
    </Wrapper>
  );
}
