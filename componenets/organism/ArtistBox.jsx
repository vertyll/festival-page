/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const Box = styled(Link)`
  background-color: white;
  padding: 30px 10px;
  height: 150px;
  width: 200px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: inherit;
  position: relative;
  box-shadow: var(--default-box-shadow);
`;

const Name = styled(Link)`
  font-weight: normal;
  margin: 0;
  text-decoration: none;
  color: inherit;
`;

const ArtistInfo = styled.div`
  margin-top: 10px;
`;

const Wrapper = styled.div``;

export default function ArtistBox({ _id, name, images }) {
  const url = "/artist/" + _id;

  return (
    <Wrapper>
      <Box href={url}>
        <Image
          src={images?.[0] || "/no-results-found.png"}
          alt=""
          fill={true}
          sizes="100vh"
          style={{
            objectFit: "cover",
          }}
        />
      </Box>
      <ArtistInfo>
        <Name href={url}>{name}</Name>
      </ArtistInfo>
    </Wrapper>
  );
}
