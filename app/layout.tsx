import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppFooter } from "../components/AppFooter";
import { AppNavigation } from "../components/AppNavigation";
import { ThemeInit } from "../components/ThemeInit";

const clashDisplay = localFont({
  src: [
    {
      path: "./fonts/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Regular.woff2",
  variable: "--font-jetbrains-mono",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yonatan Assefa - Fullstack Developer",
  description: "Fullstack developer specializing in modern web applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`app-loading ${satoshi.variable} ${clashDisplay.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var h=document.documentElement;h.classList.add('app-loading');var m=document.cookie.match(/(?:^|;\\s*)theme=(dark|light)/);var d=m?m[1]==='dark':window.matchMedia('(prefers-color-scheme:dark)').matches;if(d)h.classList.add('dark')}catch(e){}})()",
          }}
        />
      </head>
      <body className="antialiased">
        <div className="grain min-h-screen bg-background font-sans text-foreground">
          <ThemeInit />
          <AppNavigation />
          <main>{children}</main>
          <AppFooter />
        </div>
      </body>
    </html>
  );
}
