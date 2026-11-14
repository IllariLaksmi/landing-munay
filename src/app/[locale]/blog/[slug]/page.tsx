import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, locales } from "@/lib/i18n";
import { formatPostDate, getPost, getPosts } from "@/lib/blog";
import { Markdown } from "@/components/blog/Markdown";
import { DonateBanner } from "@/components/sections/DonateBanner";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPosts(locale).map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) return {};

  const post = getPost(locale, slug);
  if (!post) return {};

  return {
    title: `${post.title} — Munay`,
    description: post.excerpt,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        es: `/es/blog/${slug}`,
        en: `/en/blog/${slug}`,
        "x-default": `/es/blog/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const post = getPost(locale, slug);

  if (!post) notFound();

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 focus-visible:outline-none">
      <article>
        <header className="border-b border-blue/20 bg-cream pb-12 pt-36 sm:pb-16 sm:pt-40 lg:pt-44">
          <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex min-h-11 items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-blue underline underline-offset-4 hover:decoration-2"
            >
              <span aria-hidden="true">←</span>
              {dict.blog.backToBlog}
            </Link>

            <p className="mt-8 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-blue/80">
              {dict.blog.publishedOn} {formatPostDate(locale, post.date)}
            </p>
            <h1 className="display-balance mt-4 font-display text-5xl leading-[0.88] text-blue sm:text-6xl lg:text-7xl">
              {post.title}
            </h1>
            <p className="pretty mt-6 max-w-2xl text-base leading-relaxed text-blue sm:text-lg">
              {post.excerpt}
            </p>
            <p className="mt-6 text-sm font-semibold text-blue">
              {dict.blog.by} {post.author}
            </p>
          </div>
        </header>

        <div className="bg-cream py-16 sm:py-20">
          <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
            <Markdown content={post.body} />
          </div>
        </div>
      </article>

      <DonateBanner dict={dict.home.donate} a11y={dict.a11y} />
    </main>
  );
}
