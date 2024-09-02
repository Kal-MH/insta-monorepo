import PageTitle from "@/components/PageTitle";
import { useNavigate } from "react-router-dom";
import { Button } from "@insta-monorepo/design-system";
import styled from "styled-components";

const Error = () => {
  const navigate = useNavigate();

  const handleNavigateBtnClick = () => {
    navigate(-1);
  };
  return (
    <Container>
      <PageTitle title="Error" />
      <Title>에러가 발생했습니다!</Title>
      <NavigateBtn onClick={handleNavigateBtnClick}>뒤로가기</NavigateBtn>
    </Container>
  );
};

export default Error;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 30px;
  font-weight: 700;
`;

const NavigateBtn = styled(Button)`
  width: 100px;
  cursor: pointer;
`;
