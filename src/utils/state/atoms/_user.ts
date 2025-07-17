import { atom } from "jotai";

import type { User } from "@/db/models";

const userString = localStorage.getItem("user");
const initialUser: User | null = userString
  ? (JSON.parse(userString) as User)
  : null;

export default atom<User | null>(initialUser);
