import * as express from "express";

import { userAuth } from "./middlewareAuth";
import { confirmEmail } from "../modules/user/confirmEmail";
import register from "../modules/user/register";
import login from "../modules/user/login";
import me from "../modules/user/me";

const Router = express.Router();

Router
	// User module
	.get("/", userAuth, me.me)
	.post("/register", register.register)
	.post("/login", login.login)
	.get("/logout", login.logout)
	.get("/confirm/:id", confirmEmail);

export default Router;
