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
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 0.8em;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const Box = styled(Link)`
  background-color: var(--main-white-smoke-color);
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

const ArtistInfo = styled.div`
  margin-top: 10px;
  display: flex;
`;

const Wrapper = styled.div`
  background-color: var(--main-white-smoke-color);
  padding: 20px;
  box-shadow: var(--default-box-shadow);
`;

const ArtistName = styled.div`
  margin: 5px 0;
`;

const ConcertDate = styled(Link)`
  font-weight: bold;
  font-size: 0.9em;
  margin: 0;
  text-decoration: none;
  color: inherit;
`;

export default function ArtistBox({ _id, name, images, concertDate }) {
  const url = "/artist/" + _id;

  return (
    <Wrapper>
      <ArtistName>
        <Name href={url}>{name}</Name>
      </ArtistName>
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
        <HoverText>Zobacz artystę &#8594;</HoverText>
      </Box>
      <ArtistInfo>
        <ConcertDate href={url}>{formatDate(concertDate)}</ConcertDate>
      </ArtistInfo>
    </Wrapper>
  );
}
