import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";
interface RouterProps {
  history: string;
}
type Props = RouteComponentProps<RouterProps>;

export function LoginPage(props: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const { signIn } = useAuth();

  async function handleLogin(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    signIn(email, password, (erro: any) => {
      if (erro) {
        const errors: any = erro.response?.data?.data;
        if (errors.data) {
          Object.keys(errors).forEach((field) => {
            console.log(field);
            const erro = field.toUpperCase() + " " + errors[field];
            return alert(erro);
          });
        } else {
          alert("Ocorreram erros, verifique o formulário e tente novamente.");
          return false;
        }
      } else {
        props.history.push("/home");
        alert("Logado com sucesso.");
      }
    });
  }

  return (
    <div className="container-login">
      <form method="POST" className="form-control" onSubmit={handleLogin}>
        <h3 className="title">Login</h3>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type={"email"}
            required
            id="email"
            name="email"
            value={email}
            onChange={handleEmailInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type={"password"}
            required
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordInput}
          />
        </div>

        <button type="submit" className="btn">
          Entrar
        </button>
      </form>
    </div>
  );
}
function setOverlay(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function ToastError(arg0: string) {
  throw new Error("Function not implemented.");
}
