import { AxiosResponse } from "axios";
import { createContext, useCallback, useContext, useState } from "react";
import Api from "../services/ServiceConfig";
import { UsuarioService } from "../services/UsuariosService";
import { utils } from "../utils";

interface AuthContextState {
  token: TokenState;
  signIn(email: string, password: string, callback: any): void;
  userLogged(): boolean;
}

interface TokenState {
  token: string;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

function AuthProvider({ children }: { children: JSX.Element }) {
  const [token, setToken] = useState<TokenState>(() => {
    const token = utils.getToken();

    if (token) {
      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return { token };
    }

    return {} as TokenState;
  });

  const signIn = async (email: string, password: string, callback: any) => {
    await UsuarioService.login(email, password)
      .then((response: AxiosResponse) => {
        const { token } = response.data;
        setToken(token);
        utils.setToken(token);
        Api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        callback(undefined, response.data);
      })
      .catch((error: any) => {
        callback(error);
      });
  };

  const userLogged = useCallback(() => {
    const token = utils.getToken();
    if (token) {
      return true;
    }
    return false;
  }, []);

  return (
    <AuthContext.Provider value={{ token, signIn, userLogged }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
