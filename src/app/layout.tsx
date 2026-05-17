import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import Riwayat from "@/hooks/riwayat";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
  openGraph: {
    siteName: APP_NAME,
    title: {
      template: `%s | ${APP_NAME}`,
      default: APP_NAME,
    },
    description: APP_DESCRIPTION,
    url: new URL(SERVER_URL),
    images: [
      {
        url: `${new URL(SERVER_URL)}imgs/icons.webp`,
        width: 1366,
        height: 396,
        alt: "Menime logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body>
        {children}
        <Suspense>
          <Riwayat />
        </Suspense>
      </body>
    </html>
  );
}
