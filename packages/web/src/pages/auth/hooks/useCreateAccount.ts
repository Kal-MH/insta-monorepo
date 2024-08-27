import { useGenericMutation } from "@/apollo/fetcher";
import { gql } from "@apollo/client";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export const useCreateAccount = (options: any) => {
  return useGenericMutation(CREATE_ACCOUNT_MUTATION, { ...options });
};
