import axios from "axios";

import config from '../config.json';

const API = config.SERVER_API;

export default () =>
	axios.create({
		baseURL: API,
		withCredentials: true
	});
