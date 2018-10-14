import { ResolverMap } from "../../types/resolvers-utils";
import { CreateMatrixValidation } from "../../utils/validation";
import { formatYupError } from "../../utils/formatYupError";
import { Matrix } from "../../entity/Matrix";

const resolvers: ResolverMap = {
	async createMatrix(request, response) {
		const requestBody = request.body;

		try {
			await CreateMatrixValidation.validate(requestBody, { abortEarly: false });
		} catch (err) {
			response.send({
				ok: false,
				errors: formatYupError(err)
			});
			return;
		}

		/* const { title, typeMatrix, coworkers } = requestBody; */
		const { title } = requestBody;

		const titleAlreadyExists = await Matrix.findOne({
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

		response.send({ ok: true });
	}
};

export default resolvers;
