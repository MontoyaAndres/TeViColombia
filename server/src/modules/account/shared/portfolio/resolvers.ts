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
    portfolio: createMiddleware(
      middleware.auth,
      (_, { id, type }: GQL.IPortfolioOnQueryArguments) =>
        Portfolio.find({
          where: { portfolioId: id, portfolioType: type },
          order: { createdAt: "DESC" }
        })
    )
  },
  Mutation: {
    portfolio: createMiddleware(
      middleware.auth,
      async (
        _,
        { id, multimedia, description }: GQL.IPortfolioOnMutationArguments
      ) => {
        const user: Array<{ id: string }> = await User.find({
          where: { id },
          select: ["id"]
        });

        const filesSaved = (await saveMultimedia(multimedia)) as any;

        await Portfolio.create({
          portfolioId: id,
          portfolioType: user.length > 0 ? "User" : "Business", // If there's values on user
          multimedia: filesSaved,
          description
        }).save();

        return true;
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
        const user: Array<{ id: string }> = await User.find({
          where: { id },
          select: ["id"]
        });

        const filesSaved = (await saveMultimedia(multimedia)) as any;

        await Portfolio.update(
          { id: idPortfolio },
          {
            portfolioId: id,
            portfolioType: user.length > 0 ? "User" : "Business", // If there's values on user
            multimedia: filesSaved,
            description
          }
        );

        return true;
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
