import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "./_lib/AntdRegistry";
import NextNProgressClient from "@/components/re-components/ProgressBar";

// import NextNProgress from "nextjs-progressbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phim Anime Vietsub, Xem Anime Hay",
  description: "Anime 18+",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`relative dark:bg-[var(--bg-explore)] bg-white ${inter.className} `}
      >
        <StyledComponentsRegistry>
          <NextNProgressClient />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
