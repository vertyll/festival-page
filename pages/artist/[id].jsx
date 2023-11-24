import { mongooseConnect } from "@/lib/mongoose";
import styled from "styled-components";
import DivCenter from "@/components/atoms/DivCenter";
import Layout from "@/components/templates/Layout";
import StyledDescriptionBox from "@/components/atoms/StyledDescriptionBox";
import SingleBox from "@/components/atoms/SingleBox";
import { Artist } from "@/models/Artist";
import ArtistImage from "@/components/organism/ArtistImage";
import { formatDate } from "@/utils/date";
import { Stage } from "@/models/Stage";
import Head from "next/head";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 920px;
  width: 100%;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 5px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

const Title = styled.h1`
    font-size: 2em;
`;

export default function ArtistPage({ artist }) {
  const renderStage = () => {
    return artist.stage ? artist.stage.name : "Brak danych";
  };

  return (
    <>
      <Head>
        <title>{artist.name} - Sunset Festival</title>
      </Head>
      <Layout>
        <DivCenter>
          <ColWrapper>
            <SingleBox>
              <ArtistImage images={artist.images} />
            </SingleBox>
            <Row>
              <Title>{artist.name}</Title>
              <div><b>Scena:</b> {renderStage()}</div>
              <div>
                <b>Data koncertu:</b>{" "}
                {artist.concertDate
                  ? formatDate(artist.concertDate)
                  : "Brak danych"}
              </div>
              <div>
                <b>Godzina koncertu:</b>{" "}
                {artist.concertTime ? artist.concertTime : "Brak danych"}
              </div>
            </Row>
          </ColWrapper>
          {artist.description && (
            <>
              <div>
                <h3>Opis artysty</h3>
              </div>
              <StyledDescriptionBox>{artist.description}</StyledDescriptionBox>
            </>
          )}
        </DivCenter>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const artist = await Artist.findById(id).populate("stage");

  return {
    props: {
      artist: JSON.parse(JSON.stringify(artist)),
    },
  };
}
