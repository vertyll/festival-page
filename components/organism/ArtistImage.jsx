import styled from "styled-components";
import { useState } from "react";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const BigImage = styled.img`
  max-width: 100%;
  max-height: 800px;
`;
const ImageButtons = styled.div`
  display: flex;
  flex-grow: 0;
  gap: 10px;
  margin: 10px 0;
`;

const ImageButton = styled.div`
  border: 2px solid var(--border-color-for-image);
  ${(props) =>
    props.$active
      ? `
      border-color: var(--border-color-for-image);
    `
      : `
      border-color: transparent;
    `}
  height: 70px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;
const BigImageWrapper = styled.div`
  text-align: center;
`;

const NoImageText = styled.div`
  font-size: 1rem;
  color: var(--gray-color);
  text-align: center;
`;

export default function ArtistImage({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0] || "/images/no-image-found.webp");

  if (!images || images.length === 0) {
    return (
      <BigImageWrapper>
        <BigImage src="/images/no-image-found.webp" alt="Brak zdjęcia" />
        <NoImageText>brak grafiki</NoImageText>
      </BigImageWrapper>
    );
  }

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton key={image} $active={image === activeImage} onClick={() => setActiveImage(image)}>
            <Image src={image} alt="zdjęcie artysty" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
