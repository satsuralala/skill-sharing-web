
import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as UserTypeDefs } from "./user/user.schema";
import { typeDefs as PostTypeDefs } from "./post/post.schema";
export const typeDefs = mergeTypeDefs([UserTypeDefs, PostTypeDefs ]);
