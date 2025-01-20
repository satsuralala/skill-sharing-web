import { userModel } from "../../../models/all/user.model";
export const getAllUsers= async (_: any, {}) => {
  const user=await userModel.find({});
  return user;
};
