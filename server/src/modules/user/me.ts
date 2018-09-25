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
	}
};

export default resolvers;
