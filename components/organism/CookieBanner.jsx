import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BannerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--gray-color);
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 50;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Text = styled.p`
  font-size: 0.875rem;
  color: var(--dark-text-color);
  margin-bottom: 0.5rem;
  @media (min-width: 640px) {
    margin-bottom: 0;
  }
`;

const Button = styled.button`
  background-color: var(----main-medium-slate-blue-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    filter: brightness(0.85);
  }
`;

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookies_accepted');
    if (!cookiesAccepted) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookies_accepted', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <BannerWrapper>
      <Container>
        <Text>
          Ta strona używa plików cookie, aby poprawić Twoje doświadczenie. 
          Korzystając z naszej strony, zgadzasz się na wykorzystanie plików cookie.
        </Text>
        <Button onClick={acceptCookies}>
          Akceptuję
        </Button>
      </Container>
    </BannerWrapper>
  );
};

export default CookieBanner;