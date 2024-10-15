import { Open_Sans } from "next/font/google";
import "../../app/globals.css";
import Header from "../../components/layout/Header";
import { AppProvider } from "../../components/AppContext";
import { Toaster } from "react-hot-toast";
import Footer from "../../components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mundo Gelado",
  description: "Açaíteria e Sorveteria",
};

const font = Open_Sans({ subsets: ["latin"], weight: ["400", "500"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${font.className} antialiased`}
        suppressHydrationWarning
      >
        <AppProvider>
          <Toaster />
          <main className="flex flex-col min-h-screen overflow-x-hidden max-w-7xl mx-auto">
            <Header />
            <div className="container grow h-full flex align-center justify-center">
              {children}
            </div>
            <Footer />
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
