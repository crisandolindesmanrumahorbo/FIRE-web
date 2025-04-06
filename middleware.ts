import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl; // Get the request path
  const lastPath = pathname.split('/').reverse()[0];
  const isAuth = lastPath === 'login';
  const tokenExist = request.cookies.get('ACCESS_TOKEN')?.value;

  // TODO
  // 1. auth tokio runtime, sqlx, db pools -- DONE
  // 2. auth validation api -- DONE
  // 3. more common lib
  // 4. macro
  // 5. portfolio with aggreate sql maybe popular web server
  // 6. unit testing -- DONE

  // Already logged in, allow access
  if (tokenExist && !isAuth) {
    try {
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${tokenExist}`);
      const response = await fetch(`${process.env.BASE_URL}/validate`, {
        method: 'POST',
        headers: headers,
        cache: 'no-store',
      });
      if (response.status >= 400) {
        return NextResponse.redirect(new URL(`/login`, request.url));
      }
    } catch {
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
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
