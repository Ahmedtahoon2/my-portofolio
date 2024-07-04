import type { Config } from "tailwindcss";

// Define the typography configuration type
interface TypographyConfig {
  DEFAULT: {
    css: Record<string, any>;
  };
  invert?: {
    css: Record<string, any>;
  };
}

/**
 * Typography configuration preset for Tailwind CSS.
 *
 * @type {Config} Tailwind CSS configuration object.
 *
 * @example
 * import typographyPreset from './typographyPreset';
 *
 * const tailwindConfig: Config = {
 *   content: [],
 *   presets: [typographyPreset],
 * };
 *
 * export default tailwindConfig;
 */
const typographyPreset: Config = {
  content: [], // Add the content property with an empty array
  theme: {
    extend: {
      typography: (theme: any): TypographyConfig => ({
        DEFAULT: {
          css: {
            a: {
              color: theme("colors.primary.500"),
              "&:hover": {
                color: `${theme("colors.primary.600")}`,
              },
              code: { color: theme("colors.primary.400") },
            },
            "h1, h2": {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              fontSize: "2rem",
            },
            h3: {
              fontWeight: "600",
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme("colors.primary.500"),
              "&:hover": {
                color: `${theme("colors.primary.400")}`,
              },
              code: { color: theme("colors.primary.400") },
            },
            "h1, h2, h3, h4, h5, h6": {
              color: theme("colors.gray.100"),
            },
          },
        },
      }),
    },
  },
};

export default typographyPreset;
