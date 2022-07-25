import axios from "./ServiceConfig";

export const UsuarioService = {
  async login(email: string, password: string) {
    const data = { email, password };
    return await axios.post("/auth", data);
  },
  async logout() {
    return await axios.post("/logout");
  },
};
