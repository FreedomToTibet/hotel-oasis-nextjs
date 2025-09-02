// Example of using
// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   	return NextResponse.redirect(new URL('/about', request.url));
// }

import { auth } from "@/app/_lib/auth";
export const middleware = auth;

// Specify Node.js runtime
export const runtime = "nodejs";

export const config = {
  matcher: ['/account/:path*'],
};