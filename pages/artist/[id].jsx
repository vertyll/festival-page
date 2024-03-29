import { mongooseConnect } from "@/lib/mongoose";
import styled from "styled-components";
import Layout from "@/components/templates/Layout";
import SingleBox from "@/components/atoms/SingleBox";
import { Artist } from "@/models/Artist";
import ArtistImage from "@/components/organism/ArtistImage";
import { formatDate } from "@/utils/date";
import { Stage } from "@/models/Stage";
import Head from "next/head";
import BackLink from "@/components/atoms/BackLink";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  gap: 20px;
  //margin-top: 50px;
  
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  margin: 0 30px 0 30px;

  @media screen and (min-width: 768px) {
      margin: 0 30px 0 0;
  }
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
          <ColWrapper>
            <SingleBox>
              <ArtistImage images={artist.images} />
            </SingleBox>
            <Row>
              <BackLink link="/lineup" />
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

              {artist.description && (
                <>
                  {artist.description}
                </>
              )}
            </Row>
          </ColWrapper>
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
