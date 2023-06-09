import { ReactNode, createContext, useContext, useState } from "react";
import {
  AuthContextType,
  AuthResponse,
  Login,
  Signup,
} from "../types/AuthContext";
import axios from "../config/axiosConfig";
import { isAxiosError } from "axios";
import { UserType } from "../types/User";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);

  const login: Login = async ({ email, password }) => {
    let err = "";

    try {
      const { data, status } = await axios.post<AuthResponse>(
        "/auth/login",
        { email, password },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (status === 200) {
        setUser(data.user);

        err = "";
      }
    } catch (error) {
      if (isAxiosError(error)) {
        err = error.response?.data.error.message;
      } else {
        err = "Opps! Something Unexpected happens";
      }
    }

    return err;
  };
  const signup: Signup = async (signUpData) => {
    let err = "";
    try {
      await axios.post<AuthResponse>("/auth/signup", signUpData);
    } catch (error) {
      if (isAxiosError(error)) {
        err = error.response?.data.error.message;
      } else {
        err = "Opps! Something Unexpected happens";
      }
    }
    return err;
  };

  const value = {
    user,
    login,
    signup,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
