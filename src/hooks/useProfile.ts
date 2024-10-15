import { useState, useEffect } from "react";
import { IUser } from "../models/User";

export default function useProfile() {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [noPermission, setNoPermission] = useState(false);

  useEffect(() => {
    fetch("/api/perfil")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.user);
        if (data.user.role !== "admin") {
          setNoPermission(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching user profile", error);
        setError("An error occurred while fetching user profile.");
      });
  }, []);

  return { userData, error, noPermission };
}
