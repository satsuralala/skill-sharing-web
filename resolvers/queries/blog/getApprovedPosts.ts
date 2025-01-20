
import { postModel } from "../../../models/all/post.model";


export const getApprovedPosts= async (_: any, {}) => {
    
    const post=await postModel.find({status:'approved'})
    return post
 
};
