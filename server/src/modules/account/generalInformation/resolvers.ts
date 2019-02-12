import { createWriteStream, existsSync, mkdirSync } from "fs";
import { v4 } from "uuid";

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

const storeUpload = (
  stream: any,
  mimetype: string,
  path: string
): Promise<any> => {
  const extension = () => {
    if (
      mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      mimetype === "application/msword"
    ) {
      if (mimetype === "application/msword") {
        return "doc";
      }
      return "docx";
    } else {
      return mimetype.split("/")[1];
    }
  };

  const fileId = `${v4()}-${Date.now()}.${extension()}`;

  if (!existsSync(path)) {
    mkdirSync(path);
  }

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(`${path}/${fileId}`))
      .on("finish", () => resolve({ fileId }))
      .on("error", reject)
  );
};

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

        if (information.routePhoto instanceof Object) {
          const { createReadStream, mimetype } = await information.routePhoto;
          const extension = mimetype.split("/")[1];

          if (
            extension === "png" ||
            extension === "jpeg" ||
            extension === "gif"
          ) {
            const stream = createReadStream();
            const { fileId } = await storeUpload(
              stream,
              mimetype,
              `public/userPhoto`
            );
            await User.update({ id }, { routePhoto: `userPhoto/${fileId}` });
          } else {
            return [
              {
                path: "routePhoto",
                message: "Por favor suba una imagen."
              }
            ];
          }
        }

        if (information.routeCover instanceof Object) {
          const { createReadStream, mimetype } = await information.routeCover;
          const extension = mimetype.split("/")[1];

          if (
            extension === "png" ||
            extension === "jpeg" ||
            extension === "gif"
          ) {
            const stream = createReadStream();
            const { fileId } = await storeUpload(
              stream,
              mimetype,
              `public/userCover`
            );
            await User.update({ id }, { routeCover: `userCover/${fileId}` });
          } else {
            return [
              {
                path: "routeCover",
                message: "Por favor suba una imagen."
              }
            ];
          }
        }

        // `area` is only for university careers
        await information.study.forEach(study => {
          if (
            study.level === "EDUCACIÓN BÁSICA PRIMARIA" ||
            study.level === "EDUCACIÓN BÁSICA SECUNDARIA" ||
            study.level === "BACHILLERATO / EDUCACIÓN MEDIA"
          ) {
            study.area = null;
          }
        });

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
            birth: information.birth,
            civilStatus: information.civilStatus,
            linkedin: information.linkedin,
            skype: information.skype,
            website: information.website,
            gender: information.gender,
            skills: information.skills
          }
        );

        const updateCV: any[] = [];

        await information.cv.forEach(async cv => {
          const { createReadStream, mimetype } = await cv;

          if (
            mimetype === "application/pdf" ||
            mimetype ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            mimetype === "application/msword"
          ) {
            const stream = createReadStream();
            const { fileId } = await storeUpload(stream, mimetype, `public/cv`);

            await CV.create({ name: `cv/${fileId}`, user: { id } }).save();
          }

          // There is a bug with graphql when is uploading files.
          // Every object that has the file is merge with a promise.
          // To resolve this, the best solution was creating a new array with the same values.
          updateCV.push(cv);
        });

        await Promise.all([
          UpdateCreate(Languages, id, information.language),
          UpdateCreate(Study, id, information.study),
          UpdateCreate(Work, id, information.work),
          UpdateCreate(CV, id, updateCV)
        ]);

        return null;
      }
    )
  }
};
