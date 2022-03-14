const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = withBundleAnalyzer({
  // swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ["tailwindui.com", "images.unsplash.com"],
    formats: ["image/avif", "image/webp"],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       // TODO: Investigate why constants from project cannot be imported
  //       // User should be redirected to the defaults defined in @lib/regions
  //       destination: "/your-destination-path",
  //       permanent: false,
  //     },
  //   ];
  // },
  // For React v18
  // experimental: {
  //   reactRoot: true,
  // },
});

module.exports = nextConfig;
