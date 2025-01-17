
import gql from "graphql-tag";
export const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    status: String!
    likes: Int
    views: Int!
    comments:[String]
    reputationPoints: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getPost(id: ID!): Post
    getAllPosts(status: String): [Post]
  }

  type Mutation {
    createPost(title: String!, content: String!,userId:String!): Post!
    updatePost(id: ID!, title: String, content: String,userId:String!): Post!
    submitPost(id: ID!, title: String, content: String,userId:String!): Post!
    approvePost(id: ID!,userId:String!): Post!
    likePost(id: ID!,userId:String!): Post!
    increaseViewCount(id: ID!,userId:String!): Post!
  }
`;
