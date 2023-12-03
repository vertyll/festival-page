import Layout from "@/components/templates/Layout";
import styled from "styled-components";
import Title from "@/components/atoms/Title";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    max-height: 100%;
    max-width: 80%;
  }
`;

export default function MapPage() {
    return (
        <Layout>
            <Wrapper>
                <Title>Mapka</Title>
                <ImageWrapper>
                    <img
                        src="/mapka.webp"
                        alt="mapka festiwalu"
                        onError={(e) => { e.target.onerror = null; e.target.src = '/no-image-found.webp'; }}
                    />
                </ImageWrapper>
            </Wrapper>
        </Layout>
    );
}
