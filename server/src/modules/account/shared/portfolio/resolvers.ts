import { ResolveMap } from "../../../../types/graphql-utils";
import { createMiddleware } from "../../../../utils/createMiddleware";
import { middleware } from "../../../shared/authMiddleware";
import { GQL } from "../../../../types/schema";
import { storeUpload, storeDelete } from "../../../../utils/storeUploadDelete";
import { Portfolio } from "../../../../entity/Portfolio";
import { User } from "../../../../entity/User";

const saveMultimedia = (multimedia: any): any =>
  Promise.all(
    multimedia.map(
      async (
        file: any
      ): Promise<{
        public_id: string;
        secure_url: string;
        resource_type: string;
      }> => {
        const { createReadStream, mimetype } = await file;
        // If `mimetype` exists means that the use is going to upload a new file
        if (mimetype) {
          const extension = mimetype.split("/")[1];

          if (
            extension === "png" ||
            extension === "jpeg" ||
            extension === "gif" ||
            extension === "mp4"
          ) {
            const stream = createReadStream();
            const { public_id, secure_url, resource_type } = await storeUpload(
              stream,
              `portfolio`
            );

            return { public_id, secure_url, resource_type };
          }
        }

        return file;
      }
    )
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
          const fileSaved = (await saveMultimedia(multimedia)) as Array<{
            public_id: string;
            secure_url: string;
            resource_type: string;
          }>;

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
          // What `multimedia` is uploaded now
          const currentMultimedia = await Portfolio.findOne({
            where: { id: idPortfolio },
            select: ["multimedia"]
          });

          // Upload new file
          const fileSaved = (await saveMultimedia(multimedia)) as Array<{
            public_id: string;
            secure_url: string;
            resource_type: string;
          }>;

          // Update information and deleting old files
          await Promise.all([
            Portfolio.update(
              { id: idPortfolio },
              {
                portfolioId: id,
                portfolioType: user ? "User" : "Business", // If there's values on user
                multimedia: fileSaved,
                description
              }
            ),
            storeDelete(currentMultimedia.multimedia, fileSaved)
          ]);
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
        const currentFiles = await Portfolio.findOne({
          where: { id: idPortfolio },
          select: ["multimedia"]
        });

        // Delete files
        await Promise.all([
          // This function has a [] empty because we want to remove all, not compare anything
          storeDelete(currentFiles.multimedia, []),
          Portfolio.delete({ id: idPortfolio })
        ]);

        return true;
      }
    )
  }
};
