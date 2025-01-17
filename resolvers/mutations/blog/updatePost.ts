import { postModel } from "../../../models/all/post.model";
import { GraphQLError } from "graphql";


interface Input {
    id: string,
    title: string,
    content: string,
    userId:string
}

export const updatePost = async (_: any, { id,title,content,userId}: Input) => {
  if (!userId) {
    throw new GraphQLError("User not found. You should first register");
  };
  try{
      const post = await postModel.findByIdAndUpdate({id},{title,content});
      return post
  }catch(error){
    console.log(error)
  }
};
