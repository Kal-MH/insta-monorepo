import { useEffect, useRef, useState } from "react";

const LOAD_IMAGE_EVENT = "loadImage";

const observerOptions = {
  rootMargin: "200px",
  threshold: 0.5,
};

const useLazyLoadImage = (lazy = true) => {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lazy) {
      setLoaded(true);
      return;
    }

    const handleLoadImage = () => {
      setLoaded(true);
    };

    imageRef.current?.addEventListener(LOAD_IMAGE_EVENT, handleLoadImage);

    return () => {
      imageRef.current?.removeEventListener(LOAD_IMAGE_EVENT, handleLoadImage);
    };
  }, []);

  useEffect(() => {
    if (!lazy || !imageRef.current) return;

    const observer = new IntersectionObserver(
      (entries, intersectionObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectionObserver.unobserve(entry.target);
            imageRef.current?.dispatchEvent(new CustomEvent(LOAD_IMAGE_EVENT));
          }
        });
      },
      observerOptions
    );

    observer.observe(imageRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { loaded, imageRef };
};

export default useLazyLoadImage;
