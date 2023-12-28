import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "./_lib/AntdRegistry";
import NextNProgressClient from "@/components/re-components/ProgressBar";
import AuthProvider from "@/components/context/AuthProvider";
import { getServerSession } from "next-auth";

// import NextNProgress from "nextjs-progressbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phim Anime Vietsub, Xem Anime Hay",
  description: "Anime 18+",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
        className={`relative dark:bg-[var(--bg-explore)] bg-white ${inter.className} `}
      >
        <AuthProvider session={session}>
          <StyledComponentsRegistry>
            <NextNProgressClient />
            {children}
          </StyledComponentsRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
