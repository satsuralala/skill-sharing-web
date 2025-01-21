// src/handler.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '../schemas';
import { resolvers } from '../resolvers';
import { Context } from '../types';
import { connectToDb } from '../utils/connect-to-mongodb';
import { NextRequest } from 'next/server';

connectToDb();

const server = new ApolloServer<Context>({
  resolvers,
  typeDefs,
  introspection: true,
});

// Create the handler using Apollo Server and the Next.js integration
export const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: async (req) => {
    return { req }; // Return the context with the request object
  },
});
