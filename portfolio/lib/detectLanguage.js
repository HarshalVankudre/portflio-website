import { cookies, headers } from "next/headers";
import { COUNTRY_LANGUAGE_MAP, DEFAULT_LANGUAGE, localizedContent } from "./localizedContent";
import { LANGUAGE_COOKIE } from "./i18n";
import { matchSupportedLanguage } from "./languageMatch";

const COUNTRY_HEADER_KEYS = ["x-country-code", "x-vercel-ip-country", "cf-ipcountry"];

export function detectPreferredLanguage() {
  const stored = cookies().get(LANGUAGE_COOKIE)?.value;
  if (stored && localizedContent[stored]) {
    return stored;
  }

  const hdrs = headers();
  const middlewareDetected = hdrs.get("x-detected-language");
  if (middlewareDetected && localizedContent[middlewareDetected]) {
    return middlewareDetected;
  }

  const country = getCountryCode(hdrs);
  if (country) {
    const mappedLang = COUNTRY_LANGUAGE_MAP[country.toUpperCase()];
    if (mappedLang && localizedContent[mappedLang]) {
      return mappedLang;
    }
  }

  const acceptLanguage = hdrs.get("accept-language");
  const matchedLanguage = matchSupportedLanguage(acceptLanguage);
  if (matchedLanguage) {
    return matchedLanguage;
  }

  return DEFAULT_LANGUAGE;
}

function getCountryCode(hdrs) {
  for (const key of COUNTRY_HEADER_KEYS) {
    const value = hdrs.get(key);
    if (value) {
      return value;
    }
  }
  return null;
}
