
import gql from "graphql-tag";
export const typeDefs = gql`
  type Post {
    id: String!
    title: String!
    content: String!
    authorName: String!
    status: String!
    words:Int
    readIn:Int
    likes: Int
    views: Int
    comments:[String]
    images:[String]
    createdAt: String!
    updatedAt: String
    
  }

  type Query {
    getPost(id: String!): Post
    getAllPosts(userId:String):[Post]
    getApprovedPosts:[Post!]!
    getPost(userId:String!,id:String!):Post
  }

  type Mutation {
    createPost(title: String!, content: String!,userId:String!,words:Int!,readIn:Int!,images:[String]):String
    saveDraft(title: String!, content: String!,userId:String!,words:Int!,readIn:Int!,images:[String]):String
    
    updatePost(id: String!, title: String, content: String,userId:String!): Post!
    approvePost(id: String!,userId:String!): String!
    declinePost(id: String!,userId:String!): String!
    likePost(id: String!,userId:String!): Post!
    increaseViewCount(id: String!,userId:String!): Post!
  }
`;
