const express = require("express");
const next = require("next");
const cookieParser = require("cookie-parser");
const { join } = require("path");
const { parse } = require("url");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "src" });
const handle = app.getRequestHandler();

const isLoggedIn = async (req, res, funcNext) => {
	const cookie = await req.cookies["qid"];
	if (cookie) {
		return res.redirect("/");
	}
	return funcNext();
};

const isNotLoggedIn = async (req, res, funcNext) => {
	const cookie = await req.cookies["qid"];
	if (cookie) {
		return funcNext();
	}
	return res.redirect("/login");
};

app
	.prepare()
	.then(() => {
		const server = express();

		server
			.use(cookieParser())
			.use(express.static(`${__dirname}/static`))
			.get("/service-worker.js", (req, res) => {
				const parsedUrl = parse(req.url, true);
				const { pathname } = parsedUrl;
				const filePath = join(__dirname, ".next", pathname);
				app.serveStatic(req, res, filePath);
			})
			.get("/", isNotLoggedIn, (req, res) => handle(req, res))
			.get("/login", isLoggedIn, (req, res) => handle(req, res))
			.get("/register", isLoggedIn, (req, res) => handle(req, res))
			.get("*", (req, res) => handle(req, res))
			.listen(process.env.PORT || 3000);
	})
	.catch(err => {
		console.log(err);
		process.exit(1);
	});
