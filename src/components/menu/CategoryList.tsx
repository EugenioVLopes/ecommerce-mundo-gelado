import React from "react";
import { TabsList, TabsTrigger } from "@components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/src/components/ui/scroll-area";

interface Category {
  _id: string;
  name: string;
}

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-lg border bg-muted">
      <TabsList className="inline-flex h-12 items-center justify-center rounded-md bg-muted p-2 text-muted-foreground">
        <TabsTrigger
          value="all"
          className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground"
        >
          Todos
        </TabsTrigger>
        {categories.map((category) => (
          <TabsTrigger
            key={category._id}
            value={category.name}
            className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
