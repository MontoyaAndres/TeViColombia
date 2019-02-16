import { ResolveMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";
import { middleware } from "../../shared/authMiddleware";
import { GQL } from "../../../types/schema";
import storeUpload from "../../../utils/storeUpload";
import { Portafolio } from "../../../entity/Portafolio";

export const resolvers: ResolveMap = {
  Query: {
    portafolio: createMiddleware(
      middleware.auth,
      (_, { userId }: GQL.IPortafolioOnQueryArguments) =>
        Portafolio.find({
          where: { user: { id: userId } },
          order: { createdAt: "DESC" }
        })
    )
  },
  Mutation: {
    portafolio: createMiddleware(
      middleware.auth,
      async (
        _,
        { id, multimedia, description }: GQL.IPortafolioOnMutationArguments
      ) => {
        const saveMultimedia = await Promise.all(
          multimedia.map(async file => {
            const { createReadStream, mimetype } = await file;
            const extension = mimetype.split("/")[1];

            if (
              extension === "png" ||
              extension === "jpeg" ||
              extension === "gif" ||
              extension === "mp4"
            ) {
              const stream = createReadStream();
              const { fileId } = await storeUpload(
                stream,
                mimetype,
                `public/portafolio`
              );

              return `portafolio/${fileId}`;
            }

            return null;
          })
        );

        await Portafolio.create({
          multimedia: saveMultimedia,
          description,
          user: { id }
        }).save();

        return true;
      }
    )
  }
};
