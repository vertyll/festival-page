/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const Box = styled(Link)`
  background-color: var(--border-color-light);
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
`;

const Wrapper = styled.div`
  background-color: white;
  padding: 20px;
  box-shadow: var(--default-box-shadow);
`;

const ArtistName = styled.div`
  margin: 5px 0;
`;

const Date = styled(Link)`
  font-weight: normal;
  margin: 0;
  text-decoration: none;
  color: inherit;
`;

const Stage = styled(Link)`
  font-weight: normal;
  margin: 0;
  text-decoration: none;
  color: inherit;
`;

export default function ArtistBox({ _id, name, images, concertDate, scene }) {
  const url = "/artist/" + _id;

  return (
    <Wrapper>
      <ArtistName>
        <Name href={url}>{name}</Name>
      </ArtistName>
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
      </Box>
      <ArtistInfo>
      </ArtistInfo>
    </Wrapper>
  );
}
