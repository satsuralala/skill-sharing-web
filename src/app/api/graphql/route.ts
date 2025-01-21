export const dynamic = 'force-dynamic';

import { handler } from '../../../../src/handler';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}