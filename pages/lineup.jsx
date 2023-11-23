import DivCenter from "@/components/atoms/DivCenter";
import Title from "@/components/atoms/Title";
import ArtistContainer from "@/components/organism/ArtistContainer";
import Layout from "@/components/templates/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Artist } from "@/models/Artist";
import Head from "next/head";

export default function LineUpPage({ artists }) {
  return (
    <>
      <Head>
        <title>Program - Sunset Festival</title>
      </Head>
      <Layout>
        <DivCenter>
          <Title>PROGRAM 2024</Title>
          {artists && artists.length > 0 ? (
            <ArtistContainer artists={artists} />
          ) : (
            <p>Brak artystów do wyświetlenia</p>
          )}
        </DivCenter>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const artists = await Artist.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      artists: JSON.parse(JSON.stringify(artists)),
    },
  };
}
