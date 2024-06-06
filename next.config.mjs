import { build } from "velite";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

class VeliteWebpackPlugin {
  static started = false;

  apply(compiler) {
    // executed three times in nextjs
    // twice for the server (nodejs / edge runtime) and once for the client
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      await build({ watch: dev, clean: !dev });
    });
  }
}

const nextConfig = {
  // other next config here...
  webpack: (config, { isServer }) => {
    config.plugins.push(new VeliteWebpackPlugin());

    if (isServer) {
      // Any server-specific Webpack configuration here
    }

    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
