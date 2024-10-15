import React from "react";
import Sidebar from "./Sidebar";
import { ScrollArea } from "@components/ui/scroll-area";

export default function LayoutDash({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 antialiased">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="container mx-auto p-6">{children}</div>
        </ScrollArea>
      </main>
    </div>
  );
}
