import api from "./api";

export async function me() {
  const response = await api().get("/");

  return response.data;
}

export async function generalInformation() {
  const response = await api().get("/user/generalInformation");

  return response.data;
}
