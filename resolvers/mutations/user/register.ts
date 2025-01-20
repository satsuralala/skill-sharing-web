import { userModel } from "../../../models/all/user.model";
import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

interface Input {
  name: String;
  email: String;
  password: String;
}

export const register=async(_:any,{name,email,password}:Input)=>{
   if(!name || !email || !password) throw new GraphQLError('Please make sure all input fields are entered.')
    const PASS_SALT=process.env.PASS_SALT;
    const hashedPassword=await bcrypt.hash(String(password), Number(PASS_SALT))
    const user=await userModel.create({name,email,password:hashedPassword,role:'author'});
    const TOKEN_SECRET = process.env.TOKEN_SECRET || '';
    const token = await jwt.sign({ userId: user._id, email: user.email, }, TOKEN_SECRET, { expiresIn: '1d' });
    return {token}
}
