/* import { createWriteStream } from "fs";
import { v4 } from "uuid"; */

import { ResolveMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { User } from "../../../entity/User";
import { Languages } from "../../../entity/Languages";
import { Study } from "../../../entity/Study";
import { Work } from "../../../entity/Work";
import { CV } from "../../../entity/CV";
import UpdateCreate from "../shared/UpdateCreate";
import { createMiddleware } from "../../../utils/createMiddleware";
import { middleware } from "../../shared/authMiddleware";
import { GeneralInformationValidation } from "../../../utils/validation";
import { formatYupError } from "../../../utils/formatYupError";

/* const storeUpload = (stream: any, type: string): Promise<any> => {
  const extension = type.split("/")[1];
  const id = `${v4()}.${extension}`;
  const path = `public/${id}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path }))
      .on("error", reject)
  );
}; */

export const resolvers: ResolveMap = {
  Mutation: {
    generalInformation: createMiddleware(
      middleware.auth,
      async (
        _,
        { id, information }: GQL.IGeneralInformationOnMutationArguments
      ) => {
        try {
          await GeneralInformationValidation.validate(
            {
              description: information.description,
              identificationDocument: information.identificationDocument,
              telephone: information.telephone,
              linkedin: information.linkedin,
              skype: information.skype,
              website: information.website
            },
            { abortEarly: false }
          );
        } catch (err) {
          return formatYupError(err);
        }

        if (
          (information.nationality !== "Colombia" &&
            information.departament !== "Extranjero") ||
          (information.nationality === "Colombia" &&
            information.departament === "Extranjero")
        ) {
          return [
            {
              path: "departament",
              message: "Departamento invalido."
            }
          ];
        }

        await information.study.forEach(study => {
          if (
            study.level === "EDUCACIÓN BÁSICA PRIMARIA" ||
            study.level === "EDUCACIÓN BÁSICA SECUNDARIA" ||
            study.level === "BACHILLERATO / EDUCACIÓN MEDIA"
          ) {
            study.area = null;
          }
        });

        // https://github.com/prisma/graphql-yoga/tree/master/examples/file-upload
        // https://github.com/jaydenseric/graphql-upload/issues/49
        // Update images
        if (information.routePhoto || information.routeCover) {
          const info = await information.routePhoto;
          console.log(info);
          /* const response = await storeUpload(stream, type);
          console.log(response); */
        }

        return null;

        // Update user information
        await User.update(
          { id },
          {
            name: information.name,
            lastname: information.lastname,
            description: information.description,
            identificationDocumentType: information.identificationDocumentType,
            identificationDocument: information.identificationDocument,
            address: information.address,
            telephone: information.telephone,
            departament: information.departament,
            town: information.town,
            nationality: information.nationality,
            civilStatus: information.civilStatus,
            linkedin: information.linkedin,
            skype: information.skype,
            website: information.website,
            gender: information.gender,
            skills: information.skills
          }
        );

        await Promise.all([
          UpdateCreate(Languages, id, information.language),
          UpdateCreate(Study, id, information.study),
          UpdateCreate(Work, id, information.work),
          UpdateCreate(CV, id, information.cv)
        ]);

        return null;
      }
    )
  }
};
