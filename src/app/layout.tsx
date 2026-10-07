import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

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
      lang="en"
      className={`${notoSansBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        </body>
    </html>
  );
}
