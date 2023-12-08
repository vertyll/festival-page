import styled from "styled-components";
import { useState } from "react";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 600px;
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
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
  height: 35px;
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

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(
    images?.[0] || "/no-image-found.webp"
  );

  if (!images || images.length === 0) {
    return (
      <BigImageWrapper>
        <BigImage src="/no-image-found.webp" alt="Brak zdjęcia" />
        <NoImageText>brak grafiki</NoImageText>
      </BigImageWrapper>
    );
  }

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} alt="Zdjęcie produktu" />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            key={image}
            $active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="Zdjęcie produktu" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
