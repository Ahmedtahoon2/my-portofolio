import { defineConfig, defineCollection, s } from "velite";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import {
  rehypeTocPlugin,
  remarkCustomHeadingId,
  remarkImgToJsx,
  remarkInternalLinkToJsx,
} from "@/plugins/mdx";
import calcReadingTime from "@/lib/calcReadingTime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSectionize from "@hbsnow/rehype-sectionize";
import rehypeEmbed from "@hongvanpc10/rehype-embed";
import remarkDeflist from "remark-deflist";
import rehypeSlug from "rehype-slug";
import smartypants from "remark-smartypants";
import remarkBreaks from "remark-breaks";

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
      title: s.string().min(3).max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      updated: s.isodate().optional(),
      tags: s.array(s.string()).default([]),
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
      [rehypePrettyCode, { theme: "github-dark", keepBackground: false }],
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
      rehypeAccessibleEmojis,
      rehypeEmbed as any,
      rehypeSectionize,
      rehypeTocPlugin,
    ],
    remarkPlugins: [
      remarkImgToJsx,
      remarkInternalLinkToJsx,
      remarkCustomHeadingId,
      remarkDeflist,
      remarkBreaks,
      smartypants,
    ],
  },
});
