import { Route, Switch } from "react-router-dom";
import { CreateUsuarioPage } from "../pages/CreateUsuarioPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { PrivateRoutes } from "./PrivateRoutes";
import { List } from "../pages/ListPage";
export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={LoginPage} />
      <PrivateRoutes exact path="/home" component={HomePage} />
      <PrivateRoutes
        exact
        path="/criarUsuario"
        component={CreateUsuarioPage}
        role={"ADMIN"}
      />
      <PrivateRoutes path="/list" component={List} />
    </Switch>
  );
}
