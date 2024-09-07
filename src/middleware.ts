import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
function middleware(request: NextRequest) {
  console.log("middle ware page: --------------------")
  return NextResponse.redirect(new URL('patients/login', request.url))
}
 
// See "Matching Paths" below to learn more
const config = {
  matcher: '/about/:path*',
}