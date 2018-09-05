import { RegisterValidation } from "../../utils/validation";
import { ResolverMap } from "../../types/resolvers-utils";
import { formatYupError } from "../../utils/formatYupError";
import { User } from "../../entity/User";
import { createConfimEmailLink } from "../../utils/createConfimEmailLink";
import { sendEmail } from "../../utils/sendEmail";
import { redis } from "../../redis";

const resolvers: ResolverMap = {
	async register(request, response) {
		const body = request.body;

		try {
			await RegisterValidation.validate(body, { abortEarly: false });
		} catch (err) {
			response.send({
				ok: false,
				errors: formatYupError(err)
			});
			return;
		}

		const { email, password, ...rest } = body;

		const userAlreadyExists = await User.findOne({
			where: { email },
			select: ["id"]
		});

		if (userAlreadyExists) {
			response.send({
				ok: false,
				errors: [
					{
						path: "email",
						message: "El usuario ya existe."
					}
				]
			});
			return;
		}

		const user = User.create({
			email,
			password,
			...rest
		});

		await user.save();

		if (process.env.NODE_ENV !== "test") {
			await sendEmail(
				email,
				await createConfimEmailLink(
					process.env.BACKEND_HOST as string,
					user.id,
					redis
				)
			);
		}

		response.send({ ok: true });
	}
};

export default resolvers;
