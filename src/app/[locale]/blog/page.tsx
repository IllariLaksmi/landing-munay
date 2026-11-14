import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { formatPostDate, getPosts } from "@/lib/blog";
import { PageHeader } from "@/components/ui/PageHeader";
import { DonateBanner } from "@/components/sections/DonateBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const dict = await getDictionary(locale);

  return {
    title: `${dict.blog.eyebrow} — Munay`,
    description: dict.blog.intro,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        es: "/es/blog",
        en: "/en/blog",
        "x-default": "/es/blog",
      },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const posts = getPosts(locale);

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 focus-visible:outline-none">
      <PageHeader
        titleId="blog-title"
        eyebrow={dict.blog.eyebrow}
        title={dict.blog.title}
        intro={dict.blog.intro}
      />

      <section
        aria-labelledby="blog-list-title"
        className="bg-cream py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <h2 id="blog-list-title" className="sr-only">
            {dict.blog.title}
          </h2>

          {posts.length === 0 ? (
            <p className="text-base text-blue">{dict.blog.empty}</p>
          ) : (
            <ul className="border-t border-blue/20">
              {posts.map((post, index) => (
                <li key={post.slug} className="border-b border-blue/20">
                  <article className="grid gap-6 py-9 sm:grid-cols-12 sm:items-start">
                    <p
                      aria-hidden="true"
                      className="font-display text-4xl leading-none text-blue/70 sm:col-span-1"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    <div className="sm:col-span-8">
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-blue/80">
                        {formatPostDate(locale, post.date)}
                      </p>
                      <h3 className="mt-3 max-w-3xl font-display text-4xl leading-[0.98] text-blue sm:text-5xl">
                        <Link
                          href={`/${locale}/blog/${post.slug}`}
                          className="underline-offset-4 hover:underline"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="pretty mt-4 max-w-2xl text-sm leading-relaxed text-blue sm:text-base">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="sm:col-span-3 sm:justify-self-end">
                      <Link
                        href={`/${locale}/blog/${post.slug}`}
                        className="inline-flex min-h-11 items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-blue underline underline-offset-4 hover:decoration-2"
                        aria-label={`${dict.blog.readMore}: ${post.title}`}
                      >
                        {dict.blog.readMore}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <DonateBanner dict={dict.home.donate} a11y={dict.a11y} />
    </main>
  );
}
