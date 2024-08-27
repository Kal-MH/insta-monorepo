import {
  DocumentNode,
  QueryHookOptions,
  useMutation,
  useQuery,
} from "@apollo/client";

export const useGenericQuery = (
  graphql: DocumentNode,
  options: QueryHookOptions
) => {
  return useQuery(graphql, options);
};

export const useGenericMutation = (graphql: DocumentNode, options: any) => {
  return useMutation(graphql, options);
};
