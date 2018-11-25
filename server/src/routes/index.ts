import * as express from "express";

import { userAuth } from "./middlewareAuth";
import { confirmEmail } from "../modules/user/confirmEmail";
import register from "../modules/user/register";
import login from "../modules/user/login";
import user from "../modules/user/user";

const Router = express.Router();

Router
  // User module
  .get("/", userAuth, user.me)
  .get("/users", userAuth, user.users)
  .post("/register", register.register)
  .post("/login", login.login)
  .get("/logout", userAuth, login.logout)
  .get("/confirm/:id", confirmEmail)
  .post("/updateuser", userAuth, user.updateUser);

export default Router;
