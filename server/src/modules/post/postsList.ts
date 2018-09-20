import { Post } from "../../entity/Post";
import { ResolverMap } from "../../types/resolvers-utils";
import { savePostValidation } from "../../utils/validation";
import { formatYupError } from "../../utils/formatYupError";
import { User } from "../../entity/User";
import { sendEmailPost } from "../../utils/sendEmail";

const resolvers: ResolverMap = {
	async showPosts(request, response) {
		const { pagination } = request.params;
		const posts = await Post.find({
			take: pagination,
			order: { createdAt: "DESC" }
		});

		response.send({ ok: true, posts });
	},
	async showPost(request, response) {
		const { id } = request.params;
		const post = await Post.findOne({ where: { id } });

		response.send({ ok: true, post });
	},
	async savePost(request, response) {
		const res = request.body;
		console.log(request.file);

		try {
			await savePostValidation.validate(res, { abortEarly: false });
		} catch (err) {
			response.send({
				ok: false,
				errors: formatYupError(err)
			});
			return;
		}

		const { title, body } = res;

		const titleAlreadyExists = await Post.findOne({
			where: { title },
			select: ["title"]
		});

		if (titleAlreadyExists) {
			response.send({
				ok: false,
				errors: [
					{
						path: "title",
						message: "El titulo ya existe."
					}
				]
			});
			return;
		}

		if (request.session) {
			const post = Post.create({
				title,
				author: request.session.userId,
				image: `${process.env.BACKEND_HOST}/uploads/${request.file.filename}`,
				body
			});

			await post.save();

			const emails = await User.find({ select: ["email"] });
			const sendTo: string[] = [];

			// Add in a array the emails
			await emails.map(value => sendTo.push(value.email));

			sendEmailPost(
				sendTo,
				`${process.env.FRONTEND_HOST}/post/${post.id}`,
				title
			);

			response.send({ ok: true });
		}
	},
	async updatePost(request, response) {
		const body = request.body;
		const { id } = request.params;

		try {
			await savePostValidation.validate(body, { abortEarly: false });
		} catch (err) {
			response.send({
				ok: false,
				errors: formatYupError(err)
			});
			return;
		}

		if (request.session) {
			await Post.update(id, {
				...body,
				author: request.session.userId
			});

			response.send({ ok: true });
		}
	},
	async deletePost(request, response) {
		const { id } = request.params;

		await Post.delete(id);

		response.send({ ok: true });
	}
};

export default resolvers;
