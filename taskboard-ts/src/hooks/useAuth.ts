// Lab 7.1
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export type { User } from "../context/AuthContext";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be inside AuthProvider");
  }
  return ctx;
}
