import { URL } from "url";
import fetch from "node-fetch";

interface Provider {
  provider_name: string;
  provider_url: string;
  endpoints: {
    schemes?: string[];
    url: string;
  }[];
}

interface CachedProviders {
  cache?: Provider[];
}

async function getProviders(): Promise<Provider[]> {
  if (!(getProviders as CachedProviders).cache) {
    const res = await fetch("https://oembed.com/providers.json");
    (getProviders as CachedProviders).cache = (await res.json()) as Provider[];
  }
  return (getProviders as CachedProviders).cache!;
}

// TODO: Support providers that do not have schemes
async function getProviderEndpointURLForURL(
  url: string
): Promise<{ provider: Provider; endpoint: string } | null> {
  const providers = await getProviders();
  for (const provider of providers) {
    for (const endpoint of provider.endpoints) {
      if (
        endpoint.schemes?.some((scheme: string) =>
          new RegExp(scheme.replace(/\*/g, "(.*)")).test(url)
        )
      ) {
        return {
          provider,
          endpoint: endpoint.url,
        };
      }
    }
  }
  return null;
}

interface TransformerConfig {
  params?: Record<string, string>;
}

interface OEmbedResponse {
  html: string;
  // Add other properties if needed
}

const defaults = {
  width: 880,
  height: 500,
  class: "iframe-embed",
};

export const transformer = {
  name: "@remark-embedder/transformer-oembed",
  shouldTransform: async (url: string): Promise<boolean> => {
    const result = await getProviderEndpointURLForURL(url);
    return Boolean(result);
  },
  getHTML: async (
    urlString: string,
    getConfig: TransformerConfig | (() => TransformerConfig) = {}
  ): Promise<string | null> => {
    const result = await getProviderEndpointURLForURL(urlString);

    // shouldTransform prevents this, but if someone calls this directly then this would save them
    if (!result) return null;

    const { endpoint } = result;
    const url = new URL(endpoint);
    url.searchParams.set("url", urlString);

    const config: TransformerConfig =
      typeof getConfig === "function" ? getConfig() : getConfig;

    Object.entries(config.params ?? {}).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    const response = await fetch(url.toString(), {
      headers: { "User-Agent": "remark-embedder" },
    });
    const json = (await response.json()) as OEmbedResponse;

    // Modify the HTML to include default width, height, and class, and remove inline styles
    const modifiedHTML = json.html
      .replace(/width="\d+"/, `width="${defaults.width}"`)
      .replace(/height="\d+"/, `height="${defaults.height}"`)
      .replace(/style="[^"]*"/, "")
      .replace(/<iframe /, `<iframe class="${defaults.class}" `);

    return modifiedHTML;
  },
};
