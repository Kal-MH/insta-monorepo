import {
  DocumentNode,
  SuspenseQueryHookOptions,
  TypedDocumentNode,
  useMutation,
  useSuspenseQuery,
} from "@apollo/client";
import toast from "react-hot-toast";

export const useGenericQuery = (
  graphql: TypedDocumentNode<any, any>,
  options: SuspenseQueryHookOptions
) => {
  const result = useSuspenseQuery(graphql, options);

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
