import styled from "styled-components";

const SFormError = styled.span`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0px 10px 0px;
`;

interface FormErrorProps {
  errorMsg?: string;
}

function FormError({ errorMsg }: FormErrorProps) {
  return errorMsg === "" || !errorMsg ? null : (
    <SFormError>{errorMsg}</SFormError>
  );
}

export default FormError;
