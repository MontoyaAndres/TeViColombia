import * as bcrypt from "bcryptjs";

import { LoginValidation } from "../../utils/validation";
import { ResolverMap } from "../../types/resolvers-utils";
import { formatYupError } from "../../utils/formatYupError";
import { User } from "../../entity/User";

const resolvers: ResolverMap = {
	async login(request, response) {
		const body = request.body;

		try {
			await LoginValidation.validate(body, { abortEarly: false });
		} catch (err) {
			response.send({
				ok: false,
				errors: formatYupError(err)
			});
			return;
		}

		const { email, password } = body;

		const user = await User.findOne({ where: { email } });

		if (!user) {
			response.send({
				ok: false,
				errors: [
					{
						path: "email",
						message: "Correo incorrecto."
					}
				]
			});
			return;
		}

		if (!user.confirmed) {
			response.send({
				ok: false,
				errors: [
					{
						path: "email",
						message: "Por favor confirme su correo."
					}
				]
			});
			return;
		}

		const valid = await bcrypt.compare(password, user.password);

		if (!valid) {
			response.send({
				ok: false,
				errors: [
					{
						path: "password",
						message: "Contraseña incorrecta."
					}
				]
			});
			return;
		}

		// login successful
		if (request.session) {
			request.session.userId = user.id;
		}

		response.send({ ok: true });
	}
};

export default resolvers;
