import { useState, useEffect } from "react";
import { IUser } from "../models/User";

interface IApiResponse {
  user: IUser;
}

export default function useProfile() {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [noPermission, setNoPermission] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/perfil");
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        const data: IApiResponse = await response.json();
        if (isMounted) {
          setUserData(data.user);
          if (data.user.role !== "admin") {
            setNoPermission(true);
          }
        }
      } catch (error) {
        if (isMounted) {
          if (error instanceof Error && error.message === "Unauthorized") {
            setError("Você não está autorizado a acessar este perfil.");
          } else {
            console.error("Error fetching user profile", error);
            setError("Ocorreu um erro ao buscar o perfil do usuário.");
          }
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  return { userData, error, noPermission };
}
