import { createContext, ReactNode, useContext } from "react";
import { UserType } from "@/types/User";

export const UserContext = createContext<UserType | null>(null);

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (ctx === null) {
    throw new Error("useUser must be used inside <UserProvider>");
  }
  return ctx;
};

export function UserProvider({
  user,
  children,
}: {
  user: UserType | null;
  children: ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
