import { build } from "velite";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

class VeliteWebpackPlugin {
  static started = false;

  apply(compiler) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      await build({ watch: dev, clean: !dev });
    });
  }
}

const nextConfig = {
  // Basic Next.js configuration options
  swcMinify: true,
  reactStrictMode: true,
  compress: true,
  crossOrigin: "anonymous",
  typescript: { ignoreBuildErrors: true },
  eslint: { dirs: ["."], ignoreDuringBuilds: true },

  // Webpack customization
  webpack: (config, { isServer }) => {
    config.plugins.push(new VeliteWebpackPlugin());

    if (isServer) {
      // Server-specific webpack configurations if needed
    }

    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
