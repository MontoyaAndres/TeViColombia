import api from "./api";

export async function me() {
	const response = await api().get("/");

	return response.data;
}

export async function users(search) {
	const response = await api().get(`/users/?search=${search}`);

	return response.data;
}

export async function updateUser(data) {
	const response = await api().post("/updateuser", data);

	return response.data;
}
