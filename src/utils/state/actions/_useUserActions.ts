import { compareSync, hashSync } from "bcryptjs";
import { useAtom } from "jotai";
import { useNavigate } from "react-router";

import { userAtom } from "@/utils/state/atoms";
import { db } from "@/db";

export default function useUserActions() {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);

  function login(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Credentials invalid");
    }

    // fetch user from database, if user not found or password is invalid, throw error
    return db.getUserByEmail(email).then((user) => {
      if (!user) {
        console.error("User not found");
        throw new Error("User not found");
      }
      if (!user.hash || (user.hash && !compareSync(password, user.hash))) {
        console.error("Invalid password");
        throw new Error("Invalid password");
      }

      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/");
    });
  }

  function logout() {
    // remove user from local storage, set auth state to null and redirect to login page
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }

  async function register(email: string, password: string) {
    if (!email || !password || (await db.getUserByEmail(email))) {
      throw new Error("Credentials invalid or user already exists");
    }

    return db
      .createUser({
        id: crypto.randomUUID(),
        email,
        hash: hashSync(password),
        role: "user",
        settings: {},
        binders: [],
      })
      .then((id) => {
        db.getUser(id).then((user) => {
          if (!user) {
            throw new Error("User not found after registration");
          }

          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          navigate("/");
        });
      });
  }

  return {
    login,
    logout,
    register,
  };
}
