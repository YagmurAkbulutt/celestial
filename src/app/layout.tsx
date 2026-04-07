import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  defaultDescription,
  defaultKeywords,
  defaultTitle,
  organizationJsonLd,
  sharedOpenGraphImage,
  siteName,
  siteUrl,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
    siteName,
    images: [sharedOpenGraphImage],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [sharedOpenGraphImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/icon.png",
  },
  category: "maritime services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ubuntu.variable} h-full antialiased`}>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-background text-foreground"
      >
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} id="site-json-ld" />
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
