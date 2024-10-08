import styled from "styled-components";

interface FormBoxProps {
  children: React.ReactNode;
}

const FormBox = ({ children }: FormBoxProps) => {
  return <Container>{children}</Container>;
};
export default FormBox;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};

  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
`;
