import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { userModel } from "../../../models/all/user.model";
import { postModel } from "../../../models/all/post.model";


interface Input {
   id:string
   userId:string
}
export const approvePost = async (_: any, {id,userId}: Input) => {

  const user=await userModel.findById(userId);

  if(user.role==='admin'){
    const post = await postModel.findByIdAndUpdate(id,{status:"approved"})
    return 'sucessfully approved'
  }else{
    throw new GraphQLError("User must be admin to approve the post");
  }
};
