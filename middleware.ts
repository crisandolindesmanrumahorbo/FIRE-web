import { NextRequest, NextResponse } from "next/server";
import linguiConfig from "./lingui.config";

const { locales } = linguiConfig;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl; // Get the request path
  const lastPath = pathname.split("/").reverse()[0];
  const isAuth = lastPath === "login";
  const tokenExist = request.cookies.get("ACCESS_TOKEN")?.value;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    // Redirect if there is no locale
    const url = request.headers.get("referer")
      ? new URL(request.headers.get("referer") || "")
      : ({} as { pathname: string });
    const locale = url.pathname?.split("/")?.[1] || "en";
    request.nextUrl.pathname = `/${locale}${pathname}`;
    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(request.nextUrl);
  }

  // TODO
  // 3. more common lib
  // 4. macro
  // 5. portfolio with aggreate sql maybe popular web server
  // 9. chatbot history?
  // 13. search
  // 14. .sh file
  // 15. kafka integration
  // 16. redis integration -- DONE
  // 17. BE something -- TODO
  // 18. logging
  // 19. polling chat telegram bot
  // -> received chat telegram bot with narative text
  // -> llm parse the text to clean order object (maybe user need to confirm the order)
  // -> send the order to order service
  // -> send notification to the web that order created from tele -- DONE

  // Already logged in, allow access
  if (tokenExist && !isAuth) {
    try {
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${tokenExist}`);
      const response = await fetch(`${process.env.BASE_URL}/validate`, {
        method: "GET",
        headers: headers,
        cache: "no-store",
      });
      if (response.status >= 400) {
        return NextResponse.redirect(
          new URL(`/login?message=session-expired`, request.url),
        );
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
    "/((?!_next/static|_next/image|favicon.ico|service-worker.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
