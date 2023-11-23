import { mongooseConnect } from "@/lib/mongoose";
import Layout from "@/componenets/templates/Layout";
import DivCenter from "@/componenets/atoms/DivCenter";
import Title from "@/componenets/atoms/Title";
import Head from "next/head";
import { Sponsor } from "@/models/Sponsor";
import SponsorsContainer from "@/componenets/organism/SponsorsContainer";
import styled from "styled-components";

const Thanks = styled.h2`
  font-size: 1.5em;
  font-family: "Almendra", serif;
`;

export default function SponsorsPage({ sponsors }) {
  return (
    <>
      <Head>
        <title>Sponsorzy - Sunset Festival</title>
      </Head>
      <Layout>
        <DivCenter>
          <Title>Sponsorzy</Title>
          {sponsors && sponsors.length > 0 ? (
            <>
              <Thanks>Dziękujemy, że jesteście z nami</Thanks>
              <SponsorsContainer sponsors={sponsors} />
            </>
          ) : (
            <p>Brak sponsorów do wyświetlenia</p>
          )}
        </DivCenter>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const sponsors = await Sponsor.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      sponsors: JSON.parse(JSON.stringify(sponsors)),
    },
  };
}
