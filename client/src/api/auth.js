import api from "./api";

export async function login(credentials) {
  const response = await api().post("login", credentials);

  return response.data;
}

export async function register(credentials) {
  const response = await api().post("register", credentials);

  return response.data;
}

export async function logout() {
  const response = await api().get("logout");

  return response.data;
}
