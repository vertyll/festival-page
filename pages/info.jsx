import Layout from "@/components/templates/Layout";
import styled from "styled-components";
import Title from "@/components/atoms/Title";
import TitleBanner from "@/components/atoms/TitleBanner";
import DivCenter from "@/components/atoms/DivCenter";

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-weight: bold;
  
  img {
    max-height: 100%;
    max-width: 100%;
  }

  @media screen and (min-width: 1000px) {
    max-width: 60%;
  }
`;

const InfoWrapper = styled.div`
  font-weight: bold;
  
  @media screen and (min-width: 1000px) {
    max-width: 60%;
  }
`;

export default function MapPage() {
    return (
        <Layout>
          <TitleBanner imageUrl="/banermapa.webp" />
            <DivCenter>
                <Title>Praktyczne informacje</Title>
                <InfoWrapper>
                  <p>Teren Imprezy jest otwarty w dniach festiwalowych od 11:00 do 3:00.</p>
                  <p>Każdy uczestnik powinien mieć ze sobą ważny dokument tożsamości ze zdjęciem!
                    (dowód osobisty, legitymację szkolną/studencką, prawo jazdy, paszport – mTożsamość
                    w aplikacji mObywatel będzie również akceptowana)</p>
                  <p>Jeśli nie ukończyłeś 16. roku życia, musisz przebywać na festiwalu pod opieką osoby dorosłej.
                    Twój opiekun musi wypełnić odpowiednie oświadczenie  deklaracje opiekuna prawnego lub deklarację
                    osoby upoważnionej na piśmie przez opiekuna prawnego.</p>
                </InfoWrapper>
                <Title>Mapka</Title>
                <ImageWrapper>
                  <p>Sprawdź mapkę poniżej, aby łatwo odnaleźć się na festiwalu. Jeżeli potrzebujesz jej na wydarzeniu możesz ją wydrukować</p>
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
