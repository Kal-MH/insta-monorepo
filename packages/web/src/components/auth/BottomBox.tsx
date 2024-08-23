import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "@insta-monorepo/design-system";

interface BottomBox {
  cta: string;
  link: string;
  linkText: string;
}

const BottomBox = ({ cta, link, linkText }: BottomBox) => {
  return (
    <SBottomBox>
      <span>{cta}</span>
      <Link to={link}>{linkText}</Link>
    </SBottomBox>
  );
};

BottomBox.propTypes = {
  cta: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

export default BottomBox;

const SBottomBox = styled(BaseBox)`
  padding: 20px 0px;
  text-align: center;
  border: 1px solid ${(props) => props.theme.borderColor};
  a {
    font-weight: 600;
    margin-left: 5px;
    color: ${(props) => props.theme.accent};
  }
`;