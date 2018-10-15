import { User } from "../../entity/User";
import { ResolverMap } from "../../types/resolvers-utils";

const resolvers: ResolverMap = {
	async me(request, response) {
		if (request.session) {
			const me = await User.findOne({
				select: ["name", "lastname", "email"],
				where: { id: request.session.userId }
			});

			response.send({ ok: true, me });
		}
	},
	async users(request, response) {
		const search = request.query.search;

		if (request.session) {
			if (request.session) {
				const users = await User.query(
					`SELECT id, CONCAT(name, ' ', lastname) AS fullname FROM user HAVING fullname LIKE '%${search}%'`
				);

				response.send({ ok: true, users });
			}
		}
	}
};

export default resolvers;
