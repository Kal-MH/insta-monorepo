import {
  DocumentNode,
  QueryHookOptions,
  useMutation,
  useQuery,
} from "@apollo/client";
import toast from "react-hot-toast";

export const useGenericQuery = (
  graphql: DocumentNode,
  options: QueryHookOptions
) => {
  const result = useQuery(graphql, options);

  if (result?.error) {
    const { error } = result;
    console.error(error);
    toast.error(`Something went wrong: ${error.message}`, {
      position: "bottom-center",
    });
  }

  return result;
};

export const useGenericMutation = (graphql: DocumentNode, options: any) => {
  return useMutation(graphql, options);
};
