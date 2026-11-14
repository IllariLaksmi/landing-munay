import type { ReactNode } from "react";

type Block =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

function parseBlocks(markdown: string): Block[] {
  const blocks: Block[] = [];
  const lines = markdown.split(/\r?\n/);
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ") });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list.length > 0) {
      blocks.push({ type: "list", items: list });
      list = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = /^(#{2,3})\s+(.*)$/.exec(line);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        level: heading[1].length as 2 | 3,
        text: heading[2],
      });
      continue;
    }

    const listItem = /^[-*]\s+(.*)$/.exec(line);
    if (listItem) {
      flushParagraph();
      list.push(listItem[1]);
      continue;
    }

    const quote = /^>\s+(.*)$/.exec(line);
    if (quote) {
      flushParagraph();
      flushList();
      blocks.push({ type: "quote", text: quote[1] });
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

const INLINE_PATTERN = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(INLINE_PATTERN).filter((part) => part !== "");

  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`;

    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }

    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      const external = /^https?:\/\//.test(href);

      return (
        <a
          key={key}
          href={href}
          className="font-semibold text-blue underline decoration-blue/40 underline-offset-4 hover:decoration-blue"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {label}
        </a>
      );
    }

    return part;
  });
}

/**
 * Small, deliberately limited Markdown renderer for the local blog.
 * Supports headings, paragraphs, lists, blockquotes, bold, italics and links
 * without shipping an HTML parser or `dangerouslySetInnerHTML`.
 */
export function Markdown({ content }: { content: string }) {
  const blocks = parseBlocks(content);

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const key = `block-${index}`;

        if (block.type === "heading") {
          return block.level === 2 ? (
            <h2
              key={key}
              className="display-balance pt-4 font-display text-4xl leading-[0.98] text-blue"
            >
              {renderInline(block.text, key)}
            </h2>
          ) : (
            <h3
              key={key}
              className="pt-2 font-display text-3xl leading-none text-blue"
            >
              {renderInline(block.text, key)}
            </h3>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={key} className="space-y-3 pl-1">
              {block.items.map((item, itemIndex) => (
                <li
                  key={`${key}-${itemIndex}`}
                  className="flex gap-3 text-base leading-relaxed text-blue sm:text-lg"
                >
                  <span
                    aria-hidden="true"
                    className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-green"
                  />
                  <span>{renderInline(item, `${key}-${itemIndex}`)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={key}
              className="border-l-4 border-pink pl-5 font-display text-2xl leading-snug text-blue"
            >
              {renderInline(block.text, key)}
            </blockquote>
          );
        }

        return (
          <p
            key={key}
            className="pretty text-base leading-[1.85] text-blue sm:text-lg"
          >
            {renderInline(block.text, key)}
          </p>
        );
      })}
    </div>
  );
}
