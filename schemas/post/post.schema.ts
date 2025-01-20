
import gql from "graphql-tag";
export const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    authorName: String!
    status: String!
    words:Int
    readIn:Int
    likes: Int
    views: Int
    comments:[String]
    reputationPoints: Int
    images:[String]
    createdAt: String!
    updatedAt: String
    
  }

  type Query {
    getPost(id: ID!): Post
    getAllPosts(userId:String):[Post]
  }

  type Mutation {
    createPost(title: String!, content: String!,userId:String!,words:Int!,readIn:Int!,images:[String]):String
    saveDraft(title: String!, content: String!,userId:String!,words:Int!,readIn:Int!,images:[String]):String
    updatePost(id: ID!, title: String, content: String,userId:String!): Post!
    approvePost(id: ID!,userId:String!): String!
    declinePost(id: ID!,userId:String!): String!
    likePost(id: ID!,userId:String!): Post!
    increaseViewCount(id: ID!,userId:String!): Post!
  }
`;
