"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.$isVisible ? "0" : "20px")});
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
  transition-delay: ${(props) => props.$delay}ms;
`;

export default function RevealWrapper({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <Wrapper ref={ref} $isVisible={isVisible} $delay={delay}>
      {children}
    </Wrapper>
  );
}
