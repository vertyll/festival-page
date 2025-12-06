import styled from "styled-components";
import RevealWrapper from "@/components/atoms/RevealWrapper";
import SponsorBox from "./SponsorBox";

const SponsorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  padding-top: 50px;

  @media screen and (min-width: 575px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (min-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function SponsorsContainer({ sponsors }) {
  return (
    <SponsorGrid>
      {sponsors?.length > 0 &&
        sponsors.map((sponsor, index) => (
          <RevealWrapper key={sponsor._id} delay={index * 50}>
            <SponsorBox key={sponsor._id} {...sponsor}></SponsorBox>
          </RevealWrapper>
        ))}
    </SponsorGrid>
  );
}
