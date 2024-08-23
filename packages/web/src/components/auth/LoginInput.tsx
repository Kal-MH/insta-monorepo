import styled from "styled-components";
import { Input } from "@insta-monorepo/design-system";

const LoginInput = styled(Input)`
  margin-top: 5px;

  &::placeholder {
    font-size: 12px;
  }
`;

export default LoginInput;
