import { useGenericMutation } from "@/apollo/fetcher";
import { gql } from "@apollo/client";

export const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

export const useToggleLike = (options: any) => {
  return useGenericMutation(TOGGLE_LIKE_MUTATION, { ...options });
};
