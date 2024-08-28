import { useState } from "react";

const useModal = (initialValue = false) => {
  const [isModalOpened, setIsModalOpened] = useState(initialValue);

  const toggleIsModalOpened = () => {
    setIsModalOpened(!isModalOpened);
  };

  return { isModalOpened, toggleIsModalOpened };
};

export default useModal;
