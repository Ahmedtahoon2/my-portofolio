import localFont from "next/font/local";
import type { Metadata, Viewport } from "next";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Providers } from "@/components/molecules/Providers";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import "@/styles/core.css";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.geolocation.lang}
      dir={siteConfig.geolocation.dir}
      suppressHydrationWarning={true}
    >
      <body className={cn("antialiased", Inter.variable, Manrope.variable)}>
        <Providers>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <main className="flex flex-1 flex-col">{children}</main>
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
