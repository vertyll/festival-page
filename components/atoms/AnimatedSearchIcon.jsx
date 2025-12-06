import lottie from "lottie-web";
import { useRef, useEffect } from "react";

export default function AnimatedSearchIcon({ style = { maxWidth: "200px", height: "200px" } }) {
  const animContainer = useRef(null);
  const animInstance = useRef(null);

  useEffect(() => {
    let isMounted = true;

    // Ładowanie animacji dynamicznie
    fetch("/lottie/isometric-research-of-statistical-data-and-analytics.json")
      .then((response) => response.json())
      .then((animationData) => {
        if (isMounted && animContainer.current && !animInstance.current) {
          animInstance.current = lottie.loadAnimation({
            container: animContainer.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid meet",
              scaleMode: "noScale",
            },
          });
        }
      })
      .catch((error) => console.error("Error loading animation:", error));

    // Funkcja czyszcząca
    return () => {
      isMounted = false;
      if (animInstance.current) {
        animInstance.current.destroy();
        animInstance.current = null;
      }
    };
  }, []);

  return <div ref={animContainer} style={style}></div>;
}
