import { ResolveMap } from "../../../../types/graphql-utils";
import { createMiddleware } from "../../../../utils/createMiddleware";
import { middleware } from "../../../shared/authMiddleware";
import { GQL } from "../../../../types/schema";
import storeUpload from "../../../../utils/storeUpload";
import { Portfolio } from "../../../../entity/Portfolio";
import { User } from "../../../../entity/User";

const saveMultimedia = (multimedia: any) =>
  Promise.all(
    multimedia.map(async (file: any) => {
      const { createReadStream, mimetype } = await file;
      if (mimetype) {
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
            `public/portfolio`
          );

          return `portfolio/${fileId}`;
        }
      }

      return file;
    })
  );

export const resolvers: ResolveMap = {
  Query: {
    portfolio: (_, { id, limit }: GQL.IPortfolioOnQueryArguments) =>
      Portfolio.find({
        where: { portfolioId: id },
        order: { createdAt: "DESC" },
        skip: limit,
        take: 10
      })
  },
  Mutation: {
    portfolio: createMiddleware(
      middleware.auth,
      async (
        _,
        { id, multimedia, description }: GQL.IPortfolioOnMutationArguments
      ) => {
        if (description.length > 200) {
          return [
            {
              path: "description",
              message: "La descripción no puede tener más de 200 caracteres."
            }
          ];
        }

        const user = await User.findOne({
          where: { id },
          select: ["id"]
        });

        if (multimedia.length > 0) {
          const fileSaved = (await saveMultimedia(multimedia)) as any;

          await Portfolio.create({
            portfolioId: id,
            portfolioType: user ? "User" : "Business", // If there's values on user
            multimedia: fileSaved,
            description
          }).save();
        } else {
          return [
            {
              path: "description",
              message: "Por favor suba una imagen o vídeo."
            }
          ];
        }

        return null;
      }
    ),
    updatePortfolio: createMiddleware(
      middleware.auth,
      async (
        _,
        {
          id,
          idPortfolio,
          multimedia,
          description
        }: GQL.IUpdatePortfolioOnMutationArguments
      ) => {
        if (description.length > 200) {
          return [
            {
              path: "description",
              message: "La descripción no puede tener más de 200 caracteres."
            }
          ];
        }

        const user = await User.findOne({
          where: { id },
          select: ["id"]
        });

        if (multimedia.length > 0) {
          const filesSaved = (await saveMultimedia(multimedia)) as any;

          await Portfolio.update(
            { id: idPortfolio },
            {
              portfolioId: id,
              portfolioType: user ? "User" : "Business", // If there's values on user
              multimedia: filesSaved,
              description
            }
          );
        } else {
          return [
            {
              path: "description",
              message: "Por favor suba una imagen o vídeo."
            }
          ];
        }

        return null;
      }
    ),
    deletePortfolio: createMiddleware(
      middleware.auth,
      async (_, { idPortfolio }: GQL.IDeletePortfolioOnMutationArguments) => {
        await Portfolio.delete({ id: idPortfolio });

        return true;
      }
    )
  }
};
