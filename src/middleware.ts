import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export async function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
}; 