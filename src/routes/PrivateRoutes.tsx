import { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Api from "../services/ServiceConfig";

interface RoutesPropsData extends RouteProps {
  role?: string;
  component: any;
}

export function PrivateRoutes(props: RoutesPropsData) {
  const { userLogged } = useAuth();
  const { role, component: Component, ...rest } = props;
  const [perfil, setPerfil] = useState<boolean>(true);

  useEffect(() => {
    async function loadPerfils() {
      if (userLogged()) {
        await Api.get("/me")
          .then((response) => {
            const data = String(response?.data?.userPerfil?.name);
            if (data !== role) {
              setPerfil(false);
            } else {
              setPerfil(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    loadPerfils();
  }, [perfil, role, userLogged]);

  if (!userLogged()) {
    return <Redirect to="/" />;
  }
  if (!role && userLogged()) {
    console.log("caiu aqui 2");
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return perfil ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/" />
  );
}
