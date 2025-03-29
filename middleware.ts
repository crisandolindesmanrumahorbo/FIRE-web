import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl; // Get the request path
  const lastPath = pathname.split('/').reverse()[0];
  const isAuth = lastPath === 'login';
  const tokenExist = request.cookies.get('ACCESS_TOKEN')?.value;

  // Already logged in, allow access
  if (tokenExist) {
    return NextResponse.next();
  }

  // Redirect users who are not logged in (except when accessing /login)
  if (!isAuth && !tokenExist) {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

