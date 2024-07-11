import type { Pluggable } from "unified";
import { transformerNotationDiff } from "@shikijs/transformers";
import rehypePrettyCode, {
  LineElement,
  CharsElement,
  Options,
} from "rehype-pretty-code";

const customizedCodeTheme: Options = {
  theme: "github-dark-dimmed",
  keepBackground: false,
  defaultLang: "plaintext",
  transformers: [transformerNotationDiff()],
  onVisitLine(node: LineElement) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node: LineElement) {
    node.properties.className = ["line--highlighted"];
  },
  onVisitHighlightedChars(node: CharsElement) {
    node.properties.className = ["word--highlighted"];
  },
  filterMetaString: (meta: string) => meta.replace(/filename="([^"]+)"/, ""),
};

export const rehypeCodeCustom: Pluggable = [
  rehypePrettyCode,
  { ...customizedCodeTheme },
];
