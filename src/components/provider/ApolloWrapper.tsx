"use client";

import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { ReactNode } from "react";
import { setContext } from "@apollo/client/link/context";

interface ApolloWrapperProps {
  children: ReactNode;
<<<<<<< HEAD

=======
>>>>>>> f4ce05c0de11b02f9f0a5808ace4cb0c352b84ba
}

const makeClient = () => {
  const httpLink = new HttpLink({
    uri: " http://localhost:3000/api/graphql",
    fetchOptions: { cache: "no-store" },
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
      },
    };
  });
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
};

export const ApolloWrapper = ({ children }: ApolloWrapperProps) => {
  return (
    <ApolloNextAppProvider makeClient={() => makeClient()}>
      {children}
    </ApolloNextAppProvider>
  );
};
