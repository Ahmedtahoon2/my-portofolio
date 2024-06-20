import { defineConfig, defineCollection, s } from "velite";
import { remarkImgToJsx } from "@/plugins/remark-img-to-jsx";
import { rehypeTocPlugin } from "@/plugins/rehype-toc-plugin";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import calcReadingTime from "@/lib/calcReadingTime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeExternalLinks from "rehype-external-links";
import rehypeMinifyWhitespace from "rehype-minify-whitespace";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import smartypants from "remark-smartypants";

const computedFields = <T extends { slug: string; body: string }>(data: T) => {
  const readingTimeResult = calcReadingTime(data.body);

  return {
    ...data,
    slugAsParams: data.slug.split("/").slice(1).join("/"),
    readingTime: readingTimeResult, // Add reading time to computed fields
  };
};

// Define the posts collection schema and pattern
const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      tags: s.array(s.string()),
      body: s.mdx(),
    })
    .transform(computedFields),
});

// Export the configuration
export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "dark-plus",
          tokensMap: {
            var: "variable.other",
            fn: "entity.name.function",
            cls: "entity.name.class",
            str: "string",
            num: "constant.numeric",
            key: "keyword",
            prm: "variable.parameter",
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
      [
        rehypeExternalLinks,
        { target: "_blank", rel: ["nofollow", "noopener", "noreferrer"] },
      ],
      rehypeMinifyWhitespace,
      rehypeAccessibleEmojis,
      rehypeTocPlugin,
    ],
    remarkPlugins: [remarkImgToJsx, remarkGfm, smartypants],
  },
});
