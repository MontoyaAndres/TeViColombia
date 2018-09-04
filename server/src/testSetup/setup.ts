import { startServer } from "../startServer";

export const setup = async () => {
	await startServer();
	process.env.TEST_HOST = `http://localhost:${process.env.PORT}`;
};
