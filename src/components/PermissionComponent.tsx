import React, { useEffect, useState } from "react";
import Api from "../services/ServiceConfig";

interface PermissionComponentProps {
  role: string;
  children: React.ReactNode;
}

const PermissionComponent: React.FC<PermissionComponentProps> = ({
  role,
  children,
}) => {
  const [perfil, setPerfil] = useState<boolean>(true);

  useEffect(() => {
    async function loadPerfils() {
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
    loadPerfils();
  }, [role]);

  return <>{perfil && children}</>;
};

export { PermissionComponent };
