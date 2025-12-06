import styled from "styled-components";

const Banner = styled.div`
  width: 100%;
  max-height: 325px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
  }
`;

const Content = styled.div`
  z-index: 1;
`;

export default function TitleBanner({ imageUrl, children }) {
  return (
    <Banner>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt="Tło baneru" />
      <Content>{children}</Content>
    </Banner>
  );
}
