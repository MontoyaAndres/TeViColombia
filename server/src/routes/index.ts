import * as express from "express";

import { userAuth } from "./middlewareAuth";
import { confirmEmail } from "../modules/user/confirmEmail";
import register from "../modules/user/register";
import login from "../modules/user/login";
import user from "../modules/user/user";

const Router = express.Router();

Router.get("/", userAuth, user.me)
  .get("/user", userAuth, user.user)
  .post("/register", register.register)
  .post("/login", login.login)
  .get("/logout", userAuth, login.logout)
  .get("/confirm/:id", confirmEmail)
  .post("/updateuser", userAuth, user.updateUser);

export default Router;
