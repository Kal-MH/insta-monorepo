import { pageRoutes } from "@/apiRoutes";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Avatar } from "@insta-monorepo/design-system";
import { useUserStore } from "@/store/user";

function Header() {
  const { isLoggedIn, user } = useUserStore();

  return (
    <SHeader>
      <Wrapper>
        <Column>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </Column>
        <Column>
          {isLoggedIn ? (
            <>
              <IconsContainer>
                <Icon>
                  <Link to={pageRoutes.home}>
                    <FontAwesomeIcon icon={faHome} size="lg" />
                  </Link>
                </Icon>
                <Icon>
                  <FontAwesomeIcon icon={faCompass} size="lg" />
                </Icon>
                <Icon>
                  <Link to={`/users/${user?.me?.username}`}>
                    <Avatar
                      src={user?.me?.avatar as string}
                      alt="me"
                      placeholder="/profile.png"
                    />
                  </Link>
                </Icon>
              </IconsContainer>
            </>
          ) : (
            <Link to={pageRoutes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
}
export default Header;

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
`;

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 4px 15px;
  color: white;
  font-weight: 600;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;
