const express = require("express");
const next = require("next");
const cookieParser = require("cookie-parser");
const { join } = require("path");
const { parse } = require("url");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "src" });
const handler = app.getRequestHandler();
const server = express();

app
  .prepare()
  .then(() => {
    server
      .use(cookieParser())
      .get("/service-worker.js", (req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;
        const filePath = join(__dirname, ".next", pathname);
        app.serveStatic(req, res, filePath);
      })
      .get("/profile/:id", (req, res) =>
        app.render(req, res, "/profile", { id: req.params.id })
      )
      .get("/profile/edit/:id", (req, res) =>
        app.render(req, res, "/profile/edit", { id: req.params.id })
      )
      .get("*", (req, res) => handler(req, res))
      .listen(3000);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
