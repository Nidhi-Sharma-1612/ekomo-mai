export type DescriptionBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

const SEPARATOR_LINE = /^[-_=~*.\s]{5,}$/;
const BULLET_LINE = /^[*-]\s+/;
// Headings in Hostaway descriptions are short emoji-prefixed lines ending in a colon,
// e.g. "🌅 Living Space:" — used by hosts as informal section dividers.
const HEADING_LINE = /^\p{Extended_Pictographic}[️\s]*.{1,48}:$/u;

/**
 * Hosts write listing descriptions as loose plain text — literal dashed/underscore
 * separator lines, "* " bullets, and emoji-prefixed headings — rather than markdown.
 * This turns that into structured blocks so it can render as real typography instead
 * of one run-on paragraph with a stray line of underscores in the middle.
 */
export function parseDescriptionBlocks(raw: string): DescriptionBlock[] {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");

  const blocks: DescriptionBlock[] = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];

  function flushParagraph() {
    if (paragraphBuffer.length > 0) {
      blocks.push({ type: "paragraph", text: paragraphBuffer.join(" ") });
      paragraphBuffer = [];
    }
  }

  function flushList() {
    if (listBuffer.length > 0) {
      blocks.push({ type: "list", items: listBuffer });
      listBuffer = [];
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line || SEPARATOR_LINE.test(line)) {
      flushParagraph();
      continue;
    }

    if (HEADING_LINE.test(line)) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", text: line.replace(/:$/, "") });
      continue;
    }

    if (BULLET_LINE.test(line)) {
      flushParagraph();
      listBuffer.push(line.replace(BULLET_LINE, ""));
      continue;
    }

    flushList();
    paragraphBuffer.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}
