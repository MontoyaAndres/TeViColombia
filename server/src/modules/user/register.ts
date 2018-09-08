import { RegisterValidation } from "../../utils/validation";
import { ResolverMap } from "../../types/resolvers-utils";
import { formatYupError } from "../../utils/formatYupError";
import { User } from "../../entity/User";
import { createConfimEmailLink } from "../../utils/createConfimEmailLink";
import { sendEmailLink } from "../../utils/sendEmail";
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

		const { name, lastname, phone, email, password } = body;

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
			name,
			lastname,
			phone,
			email,
			password
		});

		await user.save();

		if (process.env.NODE_ENV !== "test") {
			await sendEmailLink(
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
