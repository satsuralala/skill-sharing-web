import { postModel } from "../../../models/all/post.model";
import { userModel } from "../../../models/all/user.model";


interface Input {
    id: string,
   
}

export const increaseViewCount = async (_: any, { id}: Input) => {
  try{
      const post = await postModel.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
        await userModel.findByIdAndUpdate(post.author, { $inc: { reputation: 5} });
      return post
  }catch(error){
    console.log(error)
  }
};
