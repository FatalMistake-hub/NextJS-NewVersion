import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/account']
const authPaths = ['/login', '/register']

const productEditRegex = /^\/products\/\d+\/edit$/

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionToken = request.cookies.get('next-auth.session-token')?.value
  // Chưa đăng nhập thì không cho vào private paths
  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  // Đăng nhập rồi thì không cho vào nữa
  // if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }
  // if (pathname.match(productEditRegex) && !sessionToken) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|/|/search|/tour).*)',
  ],
}
