import { NextResponse } from "next/server";
import { COUNTRY_LANGUAGE_MAP, DEFAULT_LANGUAGE, localizedContent } from "./lib/localizedContent";
import { LANGUAGE_COOKIE } from "./lib/i18n";
import { matchSupportedLanguage } from "./lib/languageMatch";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // one year

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);

  const countryFromHeaders =
    request.geo?.country ||
    requestHeaders.get("x-country-code") ||
    requestHeaders.get("x-vercel-ip-country") ||
    requestHeaders.get("cf-ipcountry") ||
    "";

  if (countryFromHeaders && !requestHeaders.has("x-country-code")) {
    requestHeaders.set("x-country-code", countryFromHeaders);
  }

  const queryLanguage = request.nextUrl.searchParams.get("lang");
  const cookieLanguage = request.cookies.get(LANGUAGE_COOKIE)?.value;
  let detectedLanguage =
    queryLanguage && localizedContent[queryLanguage]
      ? queryLanguage
      : cookieLanguage && localizedContent[cookieLanguage]
        ? cookieLanguage
        : null;

  if (!detectedLanguage && countryFromHeaders) {
    const mapped = COUNTRY_LANGUAGE_MAP[countryFromHeaders.toUpperCase()];
    if (mapped && localizedContent[mapped]) {
      detectedLanguage = mapped;
    }
  }

  if (!detectedLanguage) {
    const acceptLanguageHeader = requestHeaders.get("accept-language") || "";
    detectedLanguage = matchSupportedLanguage(acceptLanguageHeader);
  }

  if (!detectedLanguage) {
    detectedLanguage = DEFAULT_LANGUAGE;
  }

  requestHeaders.set("x-detected-language", detectedLanguage);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.cookies.set(LANGUAGE_COOKIE, detectedLanguage, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });

  response.headers.set("Content-Language", detectedLanguage);

  const varyHeaders = new Set(
    (response.headers.get("Vary") || "")
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean)
  );
  ["Accept-Language", "Cookie", "x-country-code"].forEach((value) => varyHeaders.add(value));
  response.headers.set("Vary", Array.from(varyHeaders).join(", "));

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
