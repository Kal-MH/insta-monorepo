import styled from "styled-components";
import { Divider } from "@insta-monorepo/design-system";

const SSeparator = styled.div`
  margin: 20px 0px 30px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  span {
    margin: 0px 10px;
    font-weight: 600;
    font-size: 12px;
    color: #8e8e8e;
  }
`;

const Separator = () => {
  return (
    <SSeparator>
      <Divider />
      <span>Or</span>
      <Divider />
    </SSeparator>
  );
};
export default Separator;
