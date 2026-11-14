import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { displayFont, sansFont } from "@/lib/fonts";
import { isLocale, locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/constants";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: "Munay",
    category: "nonprofit",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: "/es",
        en: "/en",
        "x-default": "/es",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Munay",
      locale: locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_ES"],
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}`,
      images: [
        {
          url: "/og-munay.jpg",
          width: 1200,
          height: 630,
          alt: dict.meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/og-munay.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${sansFont.variable} ${displayFont.variable}`}
    >
      <body className="flex min-h-svh flex-col bg-cream font-sans text-blue antialiased">
        <a href="#main-content" className="skip-link">
          {dict.a11y.skipToContent}
        </a>
        <Navbar locale={locale} nav={dict.nav} a11y={dict.a11y} />
        {children}
        <Footer
          footer={dict.footer}
          subscribe={dict.subscribe}
          a11y={dict.a11y}
          nav={dict.nav}
          locale={locale}
        />
      </body>
    </html>
  );
}
