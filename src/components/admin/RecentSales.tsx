import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Avatar, AvatarFallback } from "@components/ui/avatar";

const recentSales = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    sale: "R$1,999.00",
  },
  { name: "Jackson Lee", email: "jackson.lee@email.com", sale: "R$39.00" },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    sale: "R$299.00",
  },
  { name: "William Kim", email: "william.kim@email.com", sale: "R$99.00" },
  { name: "Sofia Davis", email: "sofia.davis@email.com", sale: "R$39.00" },
];

const RecentSales: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Vendas Recentes</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-8">
        {recentSales.map((sale, index) => (
          <div key={index} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>
                {sale.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{sale.name}</p>
              <p className="text-sm text-muted-foreground">{sale.email}</p>
            </div>
            <div className="ml-auto font-medium">{sale.sale}</div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default RecentSales;
