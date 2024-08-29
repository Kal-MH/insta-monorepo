import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faEllipsis,
  faHome,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar, Button } from "@insta-monorepo/design-system";
import { pageRoutes } from "@/apiRoutes";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import { logUserOut } from "@/apollo/apollo";

const Sidebar = () => {
  const { username, explore } = useParams();
  const data = useUser();
  const [showLogout, setShowLogout] = useState(false);

  const isCurPage = username ? "profile" : explore ? "explore" : "home";
  const curPageIconStyle = {
    fontWeight: 600,
  };

  const handleSettingBtnClick = () => {
    setShowLogout((prev) => !prev);
  };

  const handleLogOutBtnClick = () => {
    logUserOut();
  };

  return (
    <Container>
      <Wrapper>
        <Column>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </Column>
        <Column>
          <IconsContainer>
            <Icon>
              <Link to={pageRoutes.home}>
                <IconSvg>
                  <FontAwesomeIcon icon={faHome} size="lg" />
                </IconSvg>
                <IconText
                  style={{
                    ...(isCurPage === "home" ? curPageIconStyle : {}),
                  }}
                >
                  홈
                </IconText>
              </Link>
            </Icon>
            {/* <Icon>
              <IconSvg>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
              </IconSvg>
              <IconText
                style={{
                  ...(isCurPage === "explore" ? curPageIconStyle : {}),
                }}
              >
                검색
              </IconText>
            </Icon> */}
            <Icon>
              <Link to={`/users/${data?.me?.username}`}>
                <IconSvg>
                  <Avatar
                    src={data?.me?.avatar}
                    alt="me"
                    placeholder="/profile.png"
                  />
                </IconSvg>
                <IconText
                  style={{
                    ...(isCurPage === "profile" ? curPageIconStyle : {}),
                  }}
                >
                  프로필
                </IconText>
              </Link>
            </Icon>
          </IconsContainer>
        </Column>
        <Column>
          <Icon>
            <IconSvg onClick={handleSettingBtnClick}>
              <FontAwesomeIcon icon={faEllipsis} />
            </IconSvg>
            <IconText onClick={handleSettingBtnClick}>설정</IconText>
          </Icon>
          {showLogout && (
            <LogOutContainer>
              <LogOutButton onClick={handleLogOutBtnClick}>
                로그아웃
              </LogOutButton>
            </LogOutContainer>
          )}
        </Column>
      </Wrapper>
    </Container>
  );
};

export default Sidebar;

const Container = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  min-width: ${(props) => props.theme.navWidth.min};
  max-width: ${(props) => props.theme.navWidth.max};
  background-color: ${(props) => props.theme.bgColor};
  border-right: 1px solid ${(props) => props.theme.borderColor};
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 20px 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Column = styled.div`
  &:first-of-type {
    height: 92px;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    padding-left: 12px;
  }

  &:last-of-type {
    position: absolute;
    bottom: 0;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  flex-grow: 1;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  width: 200px;

  @media ${(props) => props.theme.device.tablet} {
    width: 100%;
  }

  a {
    display: flex;
    align-items: center;
    width: 100%;
  }
`;

const IconSvg = styled.div`
  width: 48px;
  height: 48px;

  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const IconText = styled.div`
  padding-left: 16px;
  font-size: 16px;
  height: 48px;
  line-height: 48px;
  cursor: pointer;

  @media ${(props) => props.theme.device.tablet} {
    display: none;
  }
`;

const LogOutContainer = styled.div`
  z-index: 1000;
  position: fixed;
  transform: translate(12px, -250%);

  width: 220px;
  height: 45px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

const LogOutButton = styled(Button)`
  border: none;
  outline: none;
  background-color: transparent;
  color: ${(props) => props.theme.fontColor};
  width: 100%;
  height: 100%;
  cursor: pointer;

  border-radius: 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
