import * as express from "express";
import resolvers from "../modules/register/resolvers";

const Router = express.Router();

Router.post("/register", resolvers.register).get("/", resolvers.hello);

export default Router;
