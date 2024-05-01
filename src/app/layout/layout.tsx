import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import type { Metadata } from "next";
import "../globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full flex flex-col justify-between z-40 ">
      <Navbar />

      {children}
      <Footer />
    </div>
  );
}
