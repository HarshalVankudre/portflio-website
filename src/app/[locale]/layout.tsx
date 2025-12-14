import { notFound } from "next/navigation";

import { BackToTop } from "@/components/back-to-top";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;

  return (
    <div className="bg-aurora">
      <ScrollProgress />
      <SiteHeader locale={locale} />
      <div className="mx-auto min-h-dvh max-w-6xl px-6">{children}</div>
      <BackToTop />
      <SiteFooter locale={locale} />
    </div>
  );
}
