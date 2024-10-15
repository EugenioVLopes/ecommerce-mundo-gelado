import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4000 },
  { name: "May", sales: 3000 },
  { name: "Jun", sales: 5000 },
  { name: "Jul", sales: 4000 },
  { name: "Aug", sales: 3000 },
  { name: "Sep", sales: 5000 },
  { name: "Oct", sales: 4000 },
  { name: "Nov", sales: 3000 },
  { name: "Dec", sales: 5000 },
];

const SalesChart: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Visão Geral de Vendas</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default SalesChart;
