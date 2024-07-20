import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { config, siteConfig } from "@/config/site";
import { Providers } from "@/components/molecules/Providers";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import { cn } from "@/lib/utils";
import "@/styles/core.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { lang, dir } = siteConfig.geolocation;
  return (
    <html lang={lang} dir={dir} suppressHydrationWarning={true}>
      <body className={cn(Inter.variable, Manrope.variable)}>
        <Providers>
          <div className="flex flex-col">
            <NextTopLoader
              color="#ffc34b"
              initialPosition={0.1}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px #ffc34b,0 0 5px #ffc34b"
            />
            <Header />
            <main className="flex min-h-dvh flex-1 pt-14">{children}</main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

export const Inter = localFont({
  src: "../assets/fonts/InterVariable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "1 999",
});

export const Manrope = localFont({
  src: "../assets/fonts/ManropeVariable.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "1 999",
  preload: false,
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(config.url),
  authors: { name: siteConfig.author },
  alternates: {
    canonical: config.url,
    types: {
      "application/rss+xml": `${config.url}/api/rss.xml`,
    },
  },
  icons: [{ rel: "apple-touch-icon", url: "icons/apple-touch-icon.png" }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f1f1" },
    { media: "(prefers-color-scheme: dark)", color: "#121010" },
  ],
};
