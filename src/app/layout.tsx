import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import type { Metadata, Viewport } from "next";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Providers } from "@/components/molecules/Providers";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
