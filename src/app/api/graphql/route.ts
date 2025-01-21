// src/app/api/graphql/route.ts

export const dynamic = 'force-dynamic';

import { handler } from '../../../../src/handler';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Ensure the handler works for GET requests.
  return handler(request); // Pass the request to your handler.
}

export async function POST(request: NextRequest) {
  // Similarly, handle POST requests
  return handler(request);
}
