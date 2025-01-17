import { postModel } from "../../../models/all/post.model";
import { GraphQLError } from "graphql";


interface Input {
    id: string,
    title: string,
    content: string,
    userId:string
}

export const submitPost = async (_: any, { id,title,content,userId}: Input) => {
  if (!userId) {
    throw new GraphQLError("User not found. You should first register");
  };
  try{
      const post = await postModel.findByIdAndUpdate({id},{title,content,status:'PENDING'});
      return post
  }catch(error){
    console.log(error)
  }
};
