import { TOKEN, useUserStore } from "@/store/user";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import Cookies from "js-cookie";

export const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;

const useMe = () => {
  const { isLoggedIn, setIsLoggedIn, setUser } = useUserStore();

  const { data } = useQuery(ME_QUERY, {
    skip: !isLoggedIn,
    onCompleted: (data) => {
      setUser(data);
    },
  });

  useEffect(() => {
    if (data?.me === null) {
      Cookies.remove(TOKEN);
      setIsLoggedIn(false);
    }
  }, [data]);

  return data;
};

export default useMe;
