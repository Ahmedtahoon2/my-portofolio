import { defineConfig, defineCollection, s } from "velite";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import { remarkMark } from "remark-mark-highlight";
import {
  remarkInternalLinkToJsx,
  remarkCustomHeadingId,
  remarkEmbedderPreset,
  rehypeCodeCustom,
  rehypeTocPlugin,
  remarkImgToJsx,
} from "@/plugins/mdx";
import calcReadingTime from "@/lib/calcReadingTime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSectionize from "@hbsnow/rehype-sectionize";
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
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().min(3).max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      updated: s.isodate().optional(),
      tags: s.array(s.string()).default([]),
      image: s.image(),
      imageDark: s.image().optional(),
      body: s.mdx(),
    })
    .transform(computedFields),
});

export const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().min(3).max(99),
      description: s.string(),
      date: s.isodate(),
      tags: s.array(s.string()).default([]),
      body: s.mdx(),
      image: s.image(),
      imageDark: s.image().optional(),
      published: s.boolean().default(true),
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
  collections: { posts, projects },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
      [
        rehypeExternalLinks,
        { target: "_blank", rel: ["noopener", "noreferrer"] },
      ],
      rehypeAccessibleEmojis,
      rehypeSectionize,
      rehypeCodeCustom,
      rehypeTocPlugin,
    ],
    remarkPlugins: [
      remarkEmbedderPreset,
      remarkInternalLinkToJsx,
      remarkCustomHeadingId,
      remarkImgToJsx,
      remarkDeflist,
      remarkBreaks,
      smartypants,
      remarkMark as any,
    ],
  },
});
