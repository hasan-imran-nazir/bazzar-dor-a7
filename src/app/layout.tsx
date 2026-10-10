import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { Toaster } from "react-hot-toast";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "বাজার দর",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`light ${notoSansBengali.className} h-full antialiased scroll-smooth`}
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <Marquee />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
