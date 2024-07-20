import { Node, Parent as UnistParent } from "unist";
import { Element } from "hast";
import { fromParse5 } from "hast-util-from-parse5";
import { parseFragment } from "parse5";
import { visit } from "unist-util-visit";
import { Link, Text, Paragraph } from "mdast";
import { cache, InMemoryCache } from "./cache";

interface Transformer {
  name: string;
  shouldTransform: (url: string) => Promise<boolean>;
  getHTML: (url: string, config?: any) => Promise<string>;
}

interface TransformerAndConfig {
  transformer: Transformer;
  config?: any;
}

interface RemarkEmbedderOptions {
  cache?: typeof cache;
  transformers: (Transformer | [Transformer, any])[];
  handleHTML?: (
    html: string,
    context: { url: string; transformer: Transformer; config?: any }
  ) => Promise<string>;
  handleError?: (context: {
    error: Error;
    url: string;
    transformer: Transformer;
    config?: any;
  }) => Promise<string>;
}

interface Parent extends UnistParent {
  children: Node[];
}

interface hast extends Node {
  children: Element[];
}

const htmlToHast = async (string: string): Promise<Element> => {
  const hast = fromParse5(parseFragment(string)) as hast;
  return hast.children[0];
};

const getUrlString = (url: string): string | null => {
  const urlString = url.startsWith("http") ? url : `https://${url}`;
  try {
    return new URL(urlString).toString();
  } catch (error) {
    return null;
  }
};

const isParagraph = (node: Node): node is Paragraph => {
  return node.type === "paragraph";
};

const isLink = (node: Node): node is Link => {
  return node.type === "link";
};

const isText = (node: Node): node is Text => {
  return node.type === "text";
};

export const remarkEmbedder = ({
  cache = new InMemoryCache(), // Default to InMemoryCache if not provided
  transformers,
  handleHTML,
  handleError,
}: RemarkEmbedderOptions) => {
  if (
    !cache ||
    typeof cache.get !== "function" ||
    typeof cache.set !== "function"
  ) {
    throw new Error("Invalid cache object. Ensure it has get and set methods.");
  }

  const transformersAndConfig: TransformerAndConfig[] = transformers.map((t) =>
    Array.isArray(t) ? { config: t[1], transformer: t[0] } : { transformer: t }
  );

  return async (tree: Node & Parent) => {
    const nodeAndURL: { parentNode: Parent; url: string }[] = [];

    visit(tree, "paragraph", (paragraphNode: Node) => {
      if (!isParagraph(paragraphNode) || paragraphNode.children.length !== 1) {
        return;
      }

      const node = paragraphNode.children[0];

      if (
        isText(node) ||
        (isLink(node) &&
          !node.title &&
          node.children.length === 1 &&
          isText(node.children[0]) &&
          node.children[0].value === node.url)
      ) {
        const value = isText(node) ? node.value : node.url;
        const urlString = getUrlString(value);
        if (!urlString) {
          return;
        }
        nodeAndURL.push({ parentNode: paragraphNode, url: urlString });
      }
    });

    const nodesToTransform: {
      parentNode: Parent;
      url: string;
      transformer: Transformer;
      config?: any;
    }[] = [];

    for (const node of nodeAndURL) {
      for (const transformerAndConfig of transformersAndConfig) {
        if (await transformerAndConfig.transformer.shouldTransform(node.url)) {
          nodesToTransform.push({ ...node, ...transformerAndConfig });
          break;
        }
      }
    }

    const promises = nodesToTransform.map(
      async ({ parentNode, url, transformer, config }) => {
        const errorMessageBanner = `The following error occurred while processing \`${url}\` with the remark-embedder transformer \`${transformer.name}\`:`;
        try {
          const cacheKey = `remark-embedder:${transformer.name}:${url}`;
          let html = await cache.get(cacheKey);

          try {
            if (!html) {
              html = await transformer.getHTML(url, config);
              html = html?.trim() ?? null;
              await cache.set(cacheKey, html);
            }

            if (handleHTML) {
              html = await handleHTML(html, { url, transformer, config });
              html = html?.trim() ?? null;
            }
          } catch (e) {
            if (handleError) {
              const error = e as Error;
              console.error(`${errorMessageBanner}\n\n${error.stack}`);
              html = await handleError({ error, url, transformer, config });
              html = html?.trim() ?? null;
            } else {
              throw e;
            }
          }

          if (!html) {
            return;
          }

          const htmlElement = await htmlToHast(html);
          (parentNode as Parent).data = {
            hChildren: htmlElement.children,
            hName: htmlElement.tagName,
            hProperties: htmlElement.properties,
          };
        } catch (e) {
          const error = e as Error;
          error.message = `${errorMessageBanner}\n\n${error.stack}`;
          throw error;
        }
      }
    );

    await Promise.all(promises);
    return tree;
  };
};
