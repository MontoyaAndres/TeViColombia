import * as express from "express";

import { confirmEmail } from "./confirmEmail";

const Router = express.Router();

Router.get("/confirm/:id/:type", confirmEmail);

export default Router;
