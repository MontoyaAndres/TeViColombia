import api from "./api";

export async function createMatrix(data) {
	const response = await api().post("matrix", data);

	return response.data;
}

// eslint-disable-next-line no-empty-function
export async function s() {}
