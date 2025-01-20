import gql from "graphql-tag";
export const typeDefs = gql`
  scalar Date
  type User {
    id: ID!
    name: String!
    email: String!
    role: String
    reputation: Int
    createdAt: Date
    updatedAt: Date
  }

  type responseWithToken {
    token: String!
  }
  type Query {
    getAllUsers:[User!]!
  }

  type Mutation {
    register(name: String!,email: String!,password: String!):responseWithToken!
    signIn(email: String!, password: String!):responseWithToken!
  }
`;
