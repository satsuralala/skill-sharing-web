import mongoose from "mongoose";
import { postModel } from "../../../models/all/post.model";
import { GraphQLError } from "graphql";
import { userModel } from "../../../models/all";


interface Input {
    title: string,
    content: string,
    userId:string
    words:number,
    readIn:number,
    images:[string]
}

export const createPost = async (_: any, { title,content,userId,words,readIn,images}: Input) => {
  if (!userId) {
    throw new GraphQLError("User not found. You should first register");
  };
  try{
    const user=await userModel.findById(userId);
       const post=await postModel.create({title,content,authorName:user.name,words,readIn,images});
       console.log(post)
      return "succesfully created"
  }catch(error){
    console.log(error)
  }
};
