import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { cache } from "react";
import type { Locale } from "@/lib/i18n";

const CONTENT_ROOT = join(process.cwd(), "src", "content", "blog");

export interface BlogFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  author: string;
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  locale: Locale;
  body: string;
}

function parseFrontmatter(source: string): { data: BlogFrontmatter; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source);

  if (!match) {
    return {
      data: { title: "", excerpt: "", date: "", author: "" },
      body: source.trim(),
    };
  }

  const data: Record<string, string> = {};

  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return {
    data: {
      title: data.title ?? "",
      excerpt: data.excerpt ?? "",
      date: data.date ?? "",
      author: data.author ?? "",
    },
    body: match[2].trim(),
  };
}

function readPosts(locale: Locale): BlogPost[] {
  const directory = join(CONTENT_ROOT, locale);
  let files: string[] = [];

  try {
    files = readdirSync(directory).filter((file) => /\.mdx?$/.test(file));
  } catch {
    return [];
  }

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const source = readFileSync(join(directory, file), "utf8");
      const { data, body } = parseFrontmatter(source);

      return { ...data, slug, locale, body };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** All posts for a locale, newest first. Memoized per request. */
export const getPosts = cache((locale: Locale): BlogPost[] => readPosts(locale));

export const getPostSlugs = cache((): string[] => {
  const slugs = new Set<string>();

  for (const locale of ["en", "es"] as const) {
    for (const post of readPosts(locale)) slugs.add(post.slug);
  }

  return [...slugs];
});

export const getPost = cache((locale: Locale, slug: string): BlogPost | null => {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  return getPosts(locale).find((post) => post.slug === slug) ?? null;
});

export function formatPostDate(locale: Locale, date: string): string {
  if (!date) return "";

  const parsed = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;

  return new Intl.DateTimeFormat(locale === "es" ? "es-PE" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}
