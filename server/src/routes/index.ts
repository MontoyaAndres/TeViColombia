import * as express from "express";
import register from "../modules/register/resolvers";
import login from "../modules/login/resolvers";
import { confirmEmail } from "../modules/confirmEmail/resolvers";

const Router = express.Router();

Router.post("/register", register.register)
	.post("/login", login.login)
	.get("/confirm/:id", confirmEmail);

export default Router;
