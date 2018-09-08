import axios from "axios";

const API = "http://localhost:8080/";

export default () =>
	axios.create({
		baseURL: API,
		withCredentials: true
	});
