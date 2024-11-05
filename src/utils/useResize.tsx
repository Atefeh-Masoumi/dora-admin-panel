import { useEffect, useState } from "react";

export default function useResize() {
  const [screenWidth, setScreeWidth] = useState(window.innerWidth);
  const [screenHeight, setScreeHeight] = useState(window.innerHeight);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreeWidth(window.innerWidth);
      setScreeHeight(window.innerHeight);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setScreeWidth(window.innerWidth);
        setScreeHeight(window.innerHeight);
      });
    };
  }, []);

  return {
    screenWidth: screenWidth,
    screenHeight: screenHeight,
  };
}
