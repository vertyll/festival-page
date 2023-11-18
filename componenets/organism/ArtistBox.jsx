/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import Link from "next/link";

const Box = styled(Link)`
  background-color: white;
  padding: 30px 10px;
  height: 150px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: inherit;
  border-radius: 30px;
  position: relative;
  box-shadow: var(--default-box-shadow);

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

const ArtistInfo = styled.div`
  margin-top: 10px;
`;

const Wrapper = styled.div``;

export default function ArtistBox({
  _id,
  name,
  images,
}) {
  const url = "/artist/" + _id;

  return (
    <Wrapper>
      <Box href={url}>
        <div>
          <img src={images?.[0]} alt="" />
        </div>
      </Box>
      <ArtistInfo>
        <Name href={url}>{name}</Name>
      </ArtistInfo>
    </Wrapper>
  );
}
