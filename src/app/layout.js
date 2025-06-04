import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Button from "@/components/button/Button";
import Link from "next/link";
import TranslatedText from "@/components/translatedText/TranslatedText";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Moonrise | Skræddersyede dronelysshows til events",
  description:
    "Moonrise skaber spektakulære dronelysshows, designet til at forvandle dit event til en uforglemmelig oplevelse. Fra idé til show – vi klarer det hele.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} antialiased min-h-screen flex flex-col`}
      >
        <LanguageProvider>
          <Navigation className="mb-16" />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <div className="fixed bottom-8 right-8 z-50">
            <Link href="/pages/prices">
              <Button buttonStyle="btn-three"><TranslatedText>Book show</TranslatedText></Button>
            </Link>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
