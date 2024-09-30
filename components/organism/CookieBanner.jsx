import React, { useState, useEffect } from "react";
import styled from "styled-components";

const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const BannerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--main-white-smoke-color);
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 50;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Text = styled.p`
  font-size: 0.875rem;
  color: var(--dark-text-color);
`;

const Button = styled.button`
  background-color: var(--main-medium-slate-blue-color);
  color: var(--light-text-color);
  border-radius: 30px;
  padding: 12px 17px;
  transition: 0.5s;
  transition: background-color 0.2s;
  border: 0;
  cursor: pointer;

  &:hover {
    filter: brightness(0.85);
  }
`;

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookiesAccepted = getCookie("cookies_accepted");
    if (!cookiesAccepted) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    setCookie("cookies_accepted", "true", 365);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <BannerWrapper>
      <Container>
        <Text>
          Ta strona używa plików cookie, aby poprawić Twoje doświadczenie.
          Korzystając z naszej strony, zgadzasz się na wykorzystanie plików
          cookie.
        </Text>
        <Button onClick={acceptCookies}>Akceptuję</Button>
      </Container>
    </BannerWrapper>
  );
};

export default CookieBanner;
