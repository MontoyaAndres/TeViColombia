import * as express from "express";

import { userAuth, adminAuth } from "./middlewareAuth";
import { confirmEmail } from "../modules/user/confirmEmail";
import register from "../modules/user/register";
import login from "../modules/user/login";
import me from "../modules/user/me";
import postsList from "../modules/post/postsList";
import upload from "../utils/uploadFile";

const Router = express.Router();

Router
	// User module
	.get("/", userAuth, me.me)
	.post("/register", register.register)
	.post("/login", login.login)
	.get("/logout", login.logout)
	.get("/confirm/:id", confirmEmail)

	// Post module
	.get("/posts/:pagination", postsList.showPosts)
	.get("/post/:id", postsList.showPost)
	.post("/post", adminAuth, upload.single("image"), postsList.savePost)
	.put("/post/:id", adminAuth, postsList.updatePost)
	.delete("/post/:id", adminAuth, postsList.deletePost);

export default Router;
