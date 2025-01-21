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
}

const makeClient = () => {
  const httpLink = new HttpLink({
    uri:"https://skill-sharing-drab.vercel.app/api/graphql",
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

export const ApolloWrapper = ({ children}: ApolloWrapperProps) => {
  return <ApolloNextAppProvider makeClient={()=>makeClient()}>{children}</ApolloNextAppProvider>;
};
