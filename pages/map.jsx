import Layout from "@/components/templates/Layout";
import styled from "styled-components";
import Title from "@/components/atoms/Title";
import TitleBanner from "@/components/atoms/TitleBanner";
import DivCenter from "@/components/atoms/DivCenter";

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    max-height: 100%;
    max-width: 100%;
  }

  @media screen and (min-width: 1000px) {
    max-width: 80%;
  }
`;

export default function MapPage() {
    return (
        <Layout>
          <TitleBanner imageUrl="/banermapa.webp" />
            <DivCenter>
                <Title>Mapka</Title>
                <p>Sprawdź mapkę poniżej, aby łatwo odnaleźć się na festiwalu. Jeżeli potrzebujesz jej na wydarzeniu możesz ją wydrukować</p>
                <ImageWrapper>
                    <img
                        src="/mapka.webp"
                        alt="mapka festiwalu"
                        onError={(e) => { e.target.onerror = null; e.target.src = '/no-image-found.webp'; }}
                    />
                </ImageWrapper>
            </DivCenter>
        </Layout>
    );
}
