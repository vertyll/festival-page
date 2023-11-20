import { mongooseConnect } from "@/lib/mongoose";
import styled from "styled-components";
import DivCenter from "@/componenets/atoms/DivCenter";
import Layout from "@/componenets/templates/Layout";
import Title from "@/componenets/atoms/Title";
import SingleBox from "@/componenets/atoms/SingleBox";
import { Artist } from "@/models/Artist";
import { Scene } from "@/models/Scene";
import ArtistImage from "@/componenets/organism/ArtistImage";

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

const StyledDescriptionDiv = styled.div`
  display: flex;
  max-width: 850px;
  border-radius: 30px;
  background-color: var(--light-color);
  box-shadow: var(--default-box-shadow);
  padding: 30px;
`;

export default function ArtistPage({ artist, scenePath }) {
  const renderScenePath = () => {
    if (!scenePath.length) return "Brak sceny";

    return scenePath.map((sce, index) => (
      <span key={sce._id}>
        {sce.name} {index < sce.length - 1 ? " / " : ""}
      </span>
    ));
  };

  return (
    <>
      <Layout>
        <DivCenter>
          <ColWrapper>
            <SingleBox>
              <ArtistImage images={artist.images} />
            </SingleBox>
            <Row>
              <Title>{artist.name}</Title>
              <div>Scena: {renderScenePath()}</div>
            </Row>
          </ColWrapper>
          {artist.description && (
            <>
              <div>
                <h3>Opis artysty</h3>
              </div>
              <StyledDescriptionDiv>{artist.description}</StyledDescriptionDiv>
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
  const artist = await Artist.findById(id).populate("scene");
  const sceneInfo = await Scene.find();

  const idToScene = sceneInfo.reduce((acc, scene) => {
    acc[scene._id.toString()] = scene;
    return acc;
  }, {});

  const getScenePath = (sceneId) => {
    const path = [];
    let currentScene = idToScene[sceneId];

    while (currentScene) {
      path.unshift(currentScene);
      currentScene = currentScene.parent
        ? idToScene[currentScene.parent.toString()]
        : null;
    }

    return path;
  };

  const scenePath = artist.scene ? getScenePath(artist.scene._id) : [];
  return {
    props: {
      artist: JSON.parse(JSON.stringify(artist)),
      scenePath: JSON.parse(JSON.stringify(scenePath)),
    },
  };
}
