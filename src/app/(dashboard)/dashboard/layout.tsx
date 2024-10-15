import "../../../app/globals.css";
import React from "react";
import Sidebar from "@components/admin/Sidebar";
import { ScrollArea } from "@components/ui/scroll-area";
import { Montserrat } from "next/font/google";
import { AppProvider } from "../../../components/AppContext";
import { Toaster } from "react-hot-toast";

const font = Montserrat({ subsets: ["latin"], weight: ["400", "500"] });

export default function LayoutDash({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${font.className} antialiased`}
        suppressHydrationWarning
      >
        <AppProvider>
          <Toaster />
          <div className="flex min-h-screen bg-gray-50 antialiased">
            <Sidebar />
            <main className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="container mx-auto p-6">{children}</div>
              </ScrollArea>
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}