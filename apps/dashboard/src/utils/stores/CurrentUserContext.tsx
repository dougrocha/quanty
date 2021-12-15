// React Imports
import { createContext } from "react";

// Types
import { CurrentUser } from "../types";

type CurrentUserType = {
  user?: CurrentUser;
  setUser: Function;
};

export const CurrentUserContext = createContext<CurrentUserType>({
  user: undefined,
  setUser: (user: CurrentUser) => {},
});

export const CurrentUserContextProvider = CurrentUserContext.Provider;
