"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from './components/header';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Any additional head elements */}
      </head>
      <body className={inter.className}>
          <Header />
          {children}
      </body>
    </html>
  );
}
