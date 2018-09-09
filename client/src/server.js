const express = require("express");
const next = require("next");
const { join } = require("path");
const { parse } = require("url");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "src" });
const handle = app.getRequestHandler();

app
	.prepare()
	.then(() => {
		const server = express();

		server
			.get("/service-worker.js", (req, res) => {
				const parsedUrl = parse(req.url, true);
				const { pathname } = parsedUrl;
				const filePath = join(__dirname, ".next", pathname);
				app.serveStatic(req, res, filePath);
			})
			.get("*", (req, res) => handle(req, res))
			.listen(process.env.PORT || 3000);
	})
	.catch(() => {
		process.exit(1);
	});
