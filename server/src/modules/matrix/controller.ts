import { ResolverMap } from "../../types/resolvers-utils";
import { CreateMatrixValidation } from "../../utils/validation";
import { formatYupError } from "../../utils/formatYupError";
import { Matrix } from "../../entity/Matrix";

const resolvers: ResolverMap = {
	async createMatrix(request, response) {
		const {
			data: { values, name }
		} = request.body;

		try {
			await CreateMatrixValidation.validate(values, { abortEarly: false });
		} catch (err) {
			response.send({
				ok: false,
				errors: formatYupError(err)
			});
			return;
		}

		const titleAlreadyExists = await Matrix.findOne({
			where: { title: values.title },
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

		const matrix = new Matrix();
		console.log(values.coworkers);
		matrix.coworkers = values.coworkers; // The coworkers
		matrix.title = values.title; // What name has the matrix.
		matrix.name = name; // What type of matrix is.

		await matrix.save();

		response.send({ ok: true });
	}
};

export default resolvers;
