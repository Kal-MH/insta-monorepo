import { useEffect, useState } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

const useInfiniteScroll = (callback: () => void) => {
  const { isIntersecting, targetRef } = useIntersectionObserver();
  const [loadFinished, setLoadFinished] = useState(false);

  useEffect(() => {
    if (!isIntersecting || loadFinished) return;

    callback();
  }, [isIntersecting]);

  return { targetRef, setLoadFinished, loadFinished };
};

export default useInfiniteScroll;
