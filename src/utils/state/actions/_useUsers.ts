import { useLiveQuery } from "dexie-react-hooks";

import { db } from "@/db";
import type { User } from "@/db/models";

export default function useUsers() {
  // Get all users reactively
  const allUsers = useLiveQuery(() => db.getAllUsers(), []) || [];

  return {
    allUsers,
    usersByRole: (role: User["role"]) => allUsers.filter(user => user.role === role),
    getUserById: (id: string) => allUsers.find(user => user.id === id),
    getUserByEmail: (email: string) => allUsers.find(user => user.email === email),
  };
}
