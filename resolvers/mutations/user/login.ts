import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { userModel } from "../../../models/all/user.model";


interface Input {
  email: string;
  password: string;
}

export const signIn = async (_: any, { email, password }: Input) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new GraphQLError("User not found. You should first register");
  }
  const authenticated = await bcrypt.compare(password, user.password);
  if (authenticated) {
    const TOKEN_SECRET = process.env.TOKEN_SECRET || '';
    const token = await jwt.sign({ userId: user._id, email: user.email }, TOKEN_SECRET, { expiresIn: '1d' });
    return { token };
  } else {
    throw new GraphQLError(
      "Your password is incorrect. Don’t worry—try again."
    );
  }
};
