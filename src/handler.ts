import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '../schemas';
import { NextRequest } from 'next/server';
import { resolvers } from '../resolvers';

import { Context } from '../types';
import { connectToDb } from '../utils/connect-to-mongodb';


connectToDb();

const server = new ApolloServer<Context>({
  resolvers,
  typeDefs,
  introspection: true,
});

export const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: async (req) => {
    return { req};
  },
});
