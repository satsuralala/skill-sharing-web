import mongoose from "mongoose";
import { postModel } from "../../../models/all/post.model";
import { GraphQLError } from "graphql";


interface Input {
    title: string,
    content: string,
    userId:string,
    words:number,
    readIn:number,
    images:[string],


}

export const saveDraft = async (_: any, { title,content,userId,words,readIn,images}: Input) => {
  if (!userId) {
    throw new GraphQLError("User not found. You should first register");
  };
  try{
    const authorId = new mongoose.Types.ObjectId(userId);
       const post=await postModel.create({title,content,authorId,status:'Saved',words,readIn,images});
       console.log(post)
      return "succesfully created"
  }catch(error){
    console.log(error)
  }
};
