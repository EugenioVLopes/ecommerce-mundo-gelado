"use client";

import { useEffect, useState } from "react";
import { IUser } from "@/src/models/User";
import { UserTable } from "@/src/components/layout/UserTable";

export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/usuarios");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="container mx-auto px-4 py-8">
      <UserTable users={users} isLoading={isLoading} />
    </section>
  );
}
