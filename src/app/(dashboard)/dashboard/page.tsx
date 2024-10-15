"use client";

import React from "react";
import { DollarSign, Users, ShoppingBag, Activity } from "lucide-react";
import StatCard from "@/src/components/admin/StatCard";
import SalesChart from "@/src/components/admin/SalesChart";
import RecentSales from "@/src/components/admin/RecentSales";

export default function DashboardPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Receita Total"
          value="R$45,231.89"
          change="+20.1% do último mês"
          icon={DollarSign}
        />
        <StatCard
          title="Pedidos"
          value="+2350"
          change="+180.1% do último mês"
          icon={ShoppingBag}
        />
        <StatCard
          title="Clientes Ativos"
          value="+12,234"
          change="+19% do último mês"
          icon={Users}
        />
        <StatCard
          title="Ativos Agora"
          value="+573"
          change="+201 desde última hora"
          icon={Activity}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SalesChart />
        <RecentSales />
      </div>
    </>
  );
}
