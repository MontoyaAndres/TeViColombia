import api from "./api";

export async function posts(pagination) {
	const response = await api().get(`/posts/${pagination}`);

	return response.data;
}

export async function post(id) {
	const response = await api().get(`/post/${id}`);

	return response.data;
}
