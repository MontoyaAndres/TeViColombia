import { RegisterValidation } from "../../utils/validation";
import { ResolverMap } from "../../types/resolvers-utils";
import { formatYupError } from "../../utils/formatYupError";
import { User } from "../../entity/User";

const resolvers: ResolverMap = {
	async hello(_, response) {
		response.send("hola");
	},
	async register(request, response) {
		const body = request.body;

		try {
			await RegisterValidation.validate(body, { abortEarly: false });
		} catch (err) {
			response.send({
				errors: formatYupError(err)
			});
			return;
		}

		const { email, password } = body;

		const userAlreadyExists = await User.findOne({
			where: { email },
			select: ["id"]
		});

		if (userAlreadyExists) {
			response.send({
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
			password
		});

		await user.save();

		response.send({ ok: true });
	}
};

export default resolvers;
