import { getToken } from 'next-auth/jwt';
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales } from "./navigation";

const authPages = ["/secret", "/user"];

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: "as-needed",
  defaultLocale: "en",
});

const authMiddleware = async (req: NextRequest) => {
  const requestForNextAuth = {
    headers: {
      cookie: req.headers.get('cookie') as string, // Type assertion to specify the type as string
    },
  };

  const session = await getToken({ req });
  
  if (session) {
    return intlMiddleware(req);
  } else {
    // Encode the original URL path to safely pass it as a query parameter
    const originalUrl = encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search);
    // Append 'callback' query parameter with the original URL to the '/login' path
    const loginUrl = new URL('/', req.url);
    loginUrl.searchParams.set('callback', originalUrl);

    return NextResponse.redirect(loginUrl);  }
};

export default async function middleware(req: NextRequest) {
const authPathnameRegex = RegExp(
  `^(/(${locales.join("|")}))?(${authPages.flatMap((p) => [`${p}`, `${p}(/.*)?`]).join("|")})/?$`,
  "i"
);
  const isAuthPage = authPathnameRegex.test(req.nextUrl.pathname);

  if (!isAuthPage) {
    return intlMiddleware(req);
  } else {
    return await authMiddleware(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
