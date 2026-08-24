import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "../context/ShopContext";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Trenzoo - Everything Trending, For Absolutely Everyone",
  description: "Shop the most viral trending gadgets, aesthetic home decor, Y2K streetwear, and quirky gifts blowing up your feed.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#0D1322] selection:bg-[#FF2A85] selection:text-white">
        <ShopProvider>
          {children}
        </ShopProvider>
      </body>
    </html>
  );
}
