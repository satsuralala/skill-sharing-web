import { postModel } from "../../../models/all/post.model";
import { GraphQLError } from "graphql";


interface Input {
    title: string,
    content: string,
    userId:string
}

export const createPost = async (_: any, { title,content,userId}: Input) => {
  if (!userId) {
    throw new GraphQLError("User not found. You should first register");
  };
  try{
      const post = await postModel.create({title,content,author:userId});
      return post
  }catch(error){
    console.log(error)
  }
};
