import { createContext, Dispatch, SetStateAction } from "react";

interface UserContextType {
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextType>({
  isLogged: false,
  setIsLogged: () => {},
});
