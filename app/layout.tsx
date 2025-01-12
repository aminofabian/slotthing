import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClientThemeLayout } from "./components/ClientThemeLayout";
import { ThemeProvider } from "./context/ThemeContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Lucky Slots | Modern Slot Game Experience",
  description: "Experience the thrill of modern slot gaming with stunning visuals and exciting rewards",
  authors: [{ name: "Your Name" }],
  keywords: ["slots", "gaming", "casino", "jackpot"],
  themeColor: "#581c87", // purple-900
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="font-outfit antialiased selection:bg-yellow-400 selection:text-purple-950">
        <ThemeProvider>
          <ClientThemeLayout>
            {children}
          </ClientThemeLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}