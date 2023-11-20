import DivCenter from "@/componenets/atoms/DivCenter";
import Title from "@/componenets/atoms/Title";
import ArtistContainer from "@/componenets/organism/ArtistContainer";
import Layout from "@/componenets/templates/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Artist } from "@/models/Artist";

export default function LineUpPage({artists}) {
  return (
    <Layout>
      <DivCenter>
        <Title>PROGRAM 2024</Title>
        <ArtistContainer artists={artists} />
      </DivCenter>
    </Layout>
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
