import "dotenv/config";
import "reflect-metadata";
import * as express from "express";
import * as sessions from "express-session";
import * as compression from "compression";
import * as helmet from "helmet";
import * as cors from "cors";

import { createTypeormConn } from "./utils/createTypeormConn";
import Router from "./routes";

const app = express();

const corsConfig = {
	credentials: true,
	origin:
		process.env.NODE_ENV === "test"
			? "*"
			: (process.env.FRONTEND_HOST as string)
};

export const startServer = async () => {
	app
		.use(compression())
		.use(helmet())
		.use(express.json())
		.use(express.urlencoded({ extended: false }))
		.use(cors(corsConfig))
		.use(
			sessions({
				secret: process.env.SESSIONS_SECRET as string,
				resave: false,
				saveUninitialized: false,
				cookie: {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production", // only works with https
					maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
				}
			})
		)
		.use(Router)
		.listen(process.env.PORT);

	await createTypeormConn();

	return app;
};
