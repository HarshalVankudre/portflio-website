import { localizedContent } from "./localizedContent";

const SUPPORTED_LANGUAGE_CODES = new Set(Object.keys(localizedContent));

export function matchSupportedLanguage(acceptLanguageHeader) {
  if (!acceptLanguageHeader) return null;

  const sections = acceptLanguageHeader
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

  for (const section of sections) {
    const [localePart] = section.split(";");
    if (!localePart) continue;

    const normalized = localePart.split("-")[0]?.toLowerCase();
    if (normalized && SUPPORTED_LANGUAGE_CODES.has(normalized)) {
      return normalized;
    }
  }

  return null;
}
