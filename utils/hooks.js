import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const useWindowDimensions = () => {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }

  /* eslint-disable-next-line */
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  /* eslint-disable-next-line */
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

const useIntersectionObserver = ({
  target,
  onIntersect,
  threshold = 0.1,
  rootMargin = "0px",
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      rootMargin,
      threshold,
    });

    const current = target.current;

    observer.observe(current);

    return () => {
      observer.unobserve(current);
    };
  });
};

export { useWindowDimensions, useIntersectionObserver };
