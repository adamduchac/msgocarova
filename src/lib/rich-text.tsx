import type { ReactNode } from "react";
import { fixPrepositions } from "@/lib/typography";

/**
 * Lehký markdown → React:
 *   **text** → <strong>
 *   řádky začínající "- " nebo "* " → <ul><li>
 *   prázdný řádek → nový odstavec
 */
export function renderRichText(text: string): ReactNode[] {
  const blocks = splitBlocks(text.replace(/\r\n/g, "\n").trim());
  return blocks.map((block, i) => {
    if (block.type === "ul") {
      return (
        <ul key={i} className="list-disc pl-5 space-y-1">
          {block.items.map((item, j) => (
            <li key={j}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="whitespace-pre-line">
        {renderInline(block.text)}
      </p>
    );
  });
}

type Block = { type: "p"; text: string } | { type: "ul"; items: string[] };

function splitBlocks(text: string): Block[] {
  const paragraphs = text.split(/\n{2,}/);
  const blocks: Block[] = [];
  for (const para of paragraphs) {
    const lines = para.split("\n");
    const isList = lines.every((l) => /^\s*[-*]\s+/.test(l) || l.trim() === "");
    if (isList && lines.some((l) => l.trim())) {
      const items = lines
        .filter((l) => l.trim())
        .map((l) => l.replace(/^\s*[-*]\s+/, ""));
      blocks.push({ type: "ul", items });
    } else {
      blocks.push({ type: "p", text: para });
    }
  }
  return blocks;
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push(<span key={key++}>{fixPrepositions(text.slice(last, m.index))}</span>);
    }
    nodes.push(<strong key={key++}>{fixPrepositions(m[1])}</strong>);
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    nodes.push(<span key={key++}>{fixPrepositions(text.slice(last))}</span>);
  }
  return nodes;
}
