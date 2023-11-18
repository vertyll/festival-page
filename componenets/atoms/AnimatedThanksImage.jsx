import lottie from "lottie-web";
import { useRef, useEffect } from "react";
import animationData from "./../../public/florid-web-wallet-and-online-banking.json";

export default function AnimatedThanksImage({
  style = { maxWidth: "200px", height: "200px" },
}) {
  const animContainer = useRef(null);
  const animInstance = useRef(null); // Ref do przechowywania instancji animacji

  useEffect(() => {
    // Ładowanie animacji
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

    // Funkcja czyszcząca
    return () => {
      if (animInstance.current) {
        animInstance.current.destroy(); // Zniszczenie poprzedniej animacji
      }
    };
  }, []);

  return <div ref={animContainer} style={style}></div>;
}
