import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Button } from "@components/ui/button";
import { RefreshCcw } from "lucide-react";
import { statusOptions } from "@/src/constants/orderStatus";

interface OrderFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  fetchOrders: () => void;
}

export const OrderFilters: React.FC<OrderFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  fetchOrders,
}) => {
  return (
    <Card className="mb-6 bg-fuchsia-50">
      <CardHeader>
        <CardTitle>Filtros</CardTitle>
      </CardHeader>
      <CardContent className="flex space-x-4">
        <div className="flex-1">
          <Label htmlFor="search">Buscar por ID ou Usuário</Label>
          <Input
            id="search"
            placeholder="Digite para buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-64">
          <Label htmlFor="status-filter">Filtrar por Status</Label>
          <Select
            onValueChange={setStatusFilter}
            value={statusFilter}
            defaultValue="all"
          >
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button
            onClick={fetchOrders}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Atualizar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
