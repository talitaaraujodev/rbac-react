import React from "react";
import { PermissionComponent } from "../components/PermissionComponent";

const List: React.FC = () => {
  return (
    <div>
      <h3>Menu</h3>
      <ul>
        <PermissionComponent role="ADMIN">
          <li>
            <a href="/criarUsuario">Cadastrar de Usuário</a>
          </li>
        </PermissionComponent>
        <li>
          <a href="/home">Home</a>
        </li>
      </ul>
    </div>
  );
};

export { List };
