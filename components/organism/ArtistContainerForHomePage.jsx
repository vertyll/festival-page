import styled from "styled-components";
import ArtistBox from "./ArtistBox";
import { RevealWrapper } from "next-reveal";

const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  padding-top: 50px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default function ArtistContainerForHomePage({ artists }) {
  return (
    <ArtistGrid>
      {artists?.length > 0 &&
        artists.map((artist, index) => (
          <RevealWrapper key={artist._id} delay={index * 50}>
            <ArtistBox key={artist._id} {...artist}></ArtistBox>
          </RevealWrapper>
        ))}
    </ArtistGrid>
  );
}
