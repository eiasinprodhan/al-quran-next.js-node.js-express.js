import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { SettingsProvider } from "@/context/SettingsContext";
import "./globals.css";

export const metadata = {
  title: "QuranApp — Read the Noble Quran",
  description:
    "Read all 114 surahs of the Holy Quran with Arabic text and English translation. Search, explore, and customise your reading experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-stone-50">
        <SettingsProvider>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </SettingsProvider>
      </body>
    </html>
  );
}