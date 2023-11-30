import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import "./globals.css";

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
      <body className="relative dark:bg-[var(--bg-explore)] bg-white">
        <Navbar />

        {children}
        <Footer />
      </body>
    </html>
  );
}
