import api from "./api";

export async function me() {
	const response = await api().get("/");

	return response.data;
}

export function s() {}
