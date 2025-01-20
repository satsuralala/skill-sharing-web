import { GraphQLError } from "graphql";
import { userModel } from "../../../models/all/user.model";
import { postModel } from "../../../models/all/post.model";


interface Input {
   id:string
   userId:string
}
export const declinePost = async (_: any, {id,userId}: Input) => {
  const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
  const postId = new ObjectId(id);
  const user=await userModel.findById(userId);

  if(user.role==='admin'){
    const post = await postModel.findByIdAndUpdate(postId,{status:"declined"})
    return 'sucessfully declined'
  }else{
    throw new GraphQLError("User must be admin to approve the post");
  }
};
