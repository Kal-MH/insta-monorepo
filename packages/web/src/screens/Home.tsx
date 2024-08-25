import LoginLayout, {
  authStatusType,
} from "../components/common/layouts/LoginLayout";

import { logUserOut } from "../apollo";
import styled from "styled-components";
import PageTitle from "@/components/common/PageTitle";
import CommonLayout from "@/components/common/layouts/CommonLayout";
import { gql, useQuery } from "@apollo/client";
import { FatText } from "@/components/common/shared";
import Avatar from "@/components/common/Avatar";
import { Photo } from "@/__generated__/graphql";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FEED_QUERY = gql`
  query seeFeeds {
    seeFeeds {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
    }
  }
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <LoginLayout authStatus={authStatusType.NEED_LOGIN}>
      <CommonLayout>
        <PageTitle title="Home" />
        {data?.seeFeeds?.map((photo: Photo) => (
          <PhotoContainer key={photo.id}>
            <PhotoHeader>
              <Avatar lg url={photo.user.avatar as string} />
              <Username>{photo.user.username}</Username>
            </PhotoHeader>
            <PhotoFile src={photo.file} />
            <PhotoData>
              <PhotoActions>
                <div>
                  <PhotoAction>
                    <FontAwesomeIcon size={"2x"} icon={faHeart} />
                  </PhotoAction>
                  <PhotoAction>
                    <FontAwesomeIcon size={"2x"} icon={faComment} />
                  </PhotoAction>
                  <PhotoAction>
                    <FontAwesomeIcon size={"2x"} icon={faPaperPlane} />
                  </PhotoAction>
                </div>
                <div>
                  <FontAwesomeIcon size={"2x"} icon={faBookmark} />
                </div>
              </PhotoActions>
              <Likes>
                {photo.likes === 1 ? "1 like" : `${photo.likes} likes`}
              </Likes>
            </PhotoData>
          </PhotoContainer>
        ))}
      </CommonLayout>
    </LoginLayout>
  );
};

export default Home;

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
  max-width: 615px;
`;
const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  /* max-width: 615px; */
  width: 100%;
  object-fit: contain;
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;
