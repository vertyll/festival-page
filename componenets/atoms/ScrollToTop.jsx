import React, { useState, useEffect } from "react";
import styled from "styled-components";
import IconTopArrow from "./IconTopArrow";

const StyledButton = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
  font-size: 30px;
  color: var(--main-maize-color);
  width: 30px;
  height: 30px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--main-medium-slate-blue-color);
  border-radius: 5px;
  transition: 0.5s;
  display: ${({ $show }) => ($show ? "flex" : "none")};

  &:hover {
    color: var(--nav-color);
    filter: brightness(0.85);
  }
`;

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  const checkScrollTop = () => {
    if (!showButton && window.pageYOffset > 100) {
      setShowButton(true);
    } else if (showButton && window.pageYOffset <= 100) {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showButton]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <StyledButton $show={showButton} onClick={scrollToTop}>
      <IconTopArrow />
    </StyledButton>
  );
}
