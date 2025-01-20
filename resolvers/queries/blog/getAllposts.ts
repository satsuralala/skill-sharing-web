import { GraphQLError } from "graphql";
import { userModel } from "../../../models/all/user.model";
import { postModel } from "../../../models/all/post.model";


export const getAllPosts= async (_: any, {userId}:{userId:string}) => {
  const user=await userModel.findById(userId);
  if(user.role==='admin'){
    const post = await postModel.find({status:'pending'})
    return post
  }else{
    throw new GraphQLError("User must be admin to see the posts");
  }
};
