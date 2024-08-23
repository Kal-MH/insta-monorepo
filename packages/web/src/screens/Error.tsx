import React from "react";

import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const handleClickBackButton = () => {
    navigate(-1);
  };
  return (
    <div>
      <h1>에러가 발생했습니다!</h1>
      <button onClick={handleClickBackButton}>뒤로 이동</button>
    </div>
  );
};

export default Error;
