"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@components/ui/dropdown-menu";
import { Badge } from "@components/ui/badge";
import { IUser } from "@/src/models/User";
import {
  ChevronDown,
  Search,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";

const columns = [
  { id: "avatar", name: "", sortable: false },
  { id: "name", name: "Nome", sortable: true },
  { id: "email", name: "Email", sortable: true },
  { id: "phone", name: "Telefone", sortable: true },
  { id: "role", name: "Função", sortable: true },
  { id: "actions", name: "Ações" },
];

const roleColorsMap: Record<string, string> = {
  admin: "bg-red-100 text-red-800",
  customer: "bg-blue-100 text-blue-800",
  vip: "bg-purple-100 text-purple-800",
};

const renderCell = (user: IUser, columnId: string) => {
  switch (columnId) {
    case "avatar":
      return (
        <Avatar className="content-center ml-2">
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback>
            {user.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      );
    case "name":
      return <span className="font-medium">{user.name}</span>;
    case "email":
      return <span className="text-gray-600">{user.email}</span>;
    case "phone":
      return <span className="text-gray-600">{user.phone}</span>;
    case "role":
      return (
        <Badge
          className={`${
            roleColorsMap[user.role]
          } capitalize hover:bg-transparent`}
        >
          {user.role}
        </Badge>
      );
    case "actions":
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href={`/usuarios/${user._id}/edit`}>Editar</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/usuarios/${user._id}/orders`}>Ver Pedidos</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    default:
      return null;
  }
};

const TableLoader = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
  </div>
);

interface UserTableProps {
  users: IUser[];
  isLoading: boolean;
}

export function UserTable({ users, isLoading }: UserTableProps) {
  const [isContentReady, setIsContentReady] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage] = React.useState(10);
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(columns.map((col) => col.id))
  );
  const [sortColumn, setSortColumn] = React.useState("name");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc"
  );

  React.useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setIsContentReady(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const filteredUsers = React.useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [users, filterValue]);

  const sortedUsers = React.useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const aValue = a[sortColumn as keyof IUser];
      const bValue = b[sortColumn as keyof IUser];
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredUsers, sortColumn, sortDirection]);

  const paginatedUsers = sortedUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const onSearchChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilterValue(event.target.value);
      setPage(1);
    },
    []
  );

  const onSortChange = (columnId: string) => {
    if (columnId === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnId);
      setSortDirection("asc");
    }
  };

  if (!isContentReady) {
    return <TableLoader />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-400" />
          <Input
            placeholder="Buscar usuários..."
            value={filterValue}
            onChange={onSearchChange}
            className="max-w-sm"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={visibleColumns.has(column.id)}
                onCheckedChange={(value) =>
                  setVisibleColumns(
                    value
                      ? new Set(visibleColumns).add(column.id)
                      : new Set(
                          Array.from(visibleColumns).filter(
                            (id) => id !== column.id
                          )
                        )
                  )
                }
              >
                {column.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            {columns.map((column) => (
              <TableHead
                key={column.id}
                className={column.sortable ? "cursor-pointer" : ""}
                onClick={() => column.sortable && onSortChange(column.id)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.name}</span>
                  {column.sortable && sortColumn === column.id && (
                    <ChevronDown
                      className={`h-4 w-4 ${
                        sortDirection === "desc" ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </TableHead>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Carregando...
                </TableCell>
              </TableRow>
            ) : paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => (
                <TableRow key={user._id} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {renderCell(user, column.id)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Mostrando {(page - 1) * rowsPerPage + 1} a{" "}
          {Math.min(page * rowsPerPage, filteredUsers.length)} de{" "}
          {filteredUsers.length} usuários
        </span>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={page * rowsPerPage >= filteredUsers.length}
          >
            Próximo
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
