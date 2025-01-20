import { GraphQLError } from "graphql";
import { userModel } from "../../../models/all/user.model";
import { postModel } from "../../../models/all/post.model";
import mongoose from "mongoose";


export const getPost= async (_: any, {userId,id}:{userId:string,id:string}) => {
  const user=await userModel.findById(userId);

  if(user){
    const post = await postModel.findById(id)
    return post
  }else{
    throw new GraphQLError("User must be admin to see the posts");
  }
};
