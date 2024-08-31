import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [loadFinished, setLoadFinished] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loadFinished) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const intersection = entries.some((entry) => entry.isIntersecting);
      setIsIntersecting(intersection);
    };

    observerRef.current = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "200px",
      threshold: 0.5,
    });

    const { current: currentObserver } = observerRef;
    const { current: currentTarget } = targetRef;

    if (currentTarget) {
      currentObserver.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        currentObserver.unobserve(currentTarget);
        observerRef?.current?.disconnect();
      }
    };
  }, [loadFinished]);

  return { isIntersecting, loadFinished, targetRef, setLoadFinished };
};

export default useIntersectionObserver;
