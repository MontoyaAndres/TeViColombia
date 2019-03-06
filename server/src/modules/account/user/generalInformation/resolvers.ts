import { ResolveMap } from "../../../../types/graphql-utils";
import { GQL } from "../../../../types/schema";
import { User } from "../../../../entity/User";
import { Language } from "../../../../entity/Language";
import { Study } from "../../../../entity/Study";
import { Work } from "../../../../entity/Work";
import { CV } from "../../../../entity/CV";
import { PreferWork } from "../../../../entity/PreferWork";
import UpdateCreate from "../UpdateCreate";
import { createMiddleware } from "../../../../utils/createMiddleware";
import { middleware } from "../../../shared/authMiddleware";
import { GeneralInformationValidation } from "../../../../utils/validation";
import { formatYupError } from "../../../../utils/formatYupError";
import storeUpload from "../../../../utils/storeUpload";

export const resolvers: ResolveMap = {
  Query: {
    information: createMiddleware(
      middleware.auth,
      async (
        _,
        { id }: GQL.IInformationOnQueryArguments,
        { informationUserLoader }
      ) => informationUserLoader.load(id)
    )
  },
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
              name: information.name,
              lastname: information.lastname,
              description: information.description,
              identificationDocument: information.identificationDocument,
              telephone: information.telephone,
              telephone2: information.telephone2,
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

        if (information.description.length > 100) {
          return [
            {
              path: "description",
              message: "La descripción no puede tener más de 100 caracteres."
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

        // Update preferWork information
        if (information.preferWork.id) {
          await PreferWork.update(
            { id: information.preferWork.id },
            information.preferWork
          );
        } else {
          const preferwork = await PreferWork.create(
            information.preferWork
          ).save();
          await User.update({ id }, { preferwork });
        }

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
            telephoneCountry: information.telephoneCountry,
            telephone: information.telephone,
            telephone2Country: information.telephone2Country,
            telephone2: information.telephone2,
            departament: information.departament,
            town: information.town,
            nationality: information.nationality,
            birth: information.birth,
            civilStatus: information.civilStatus,
            website: information.website,
            gender: information.gender,
            disability: information.disability,
            optionalEmail: information.optionalEmail,
            skills: information.skills,
            socialnetwork: information.socialnetwork
          }
        );

        const saveCV = await Promise.all(
          information.cv.map(async cv => {
            const { createReadStream, mimetype, filename } = await cv;

            if (
              mimetype === "application/pdf" ||
              mimetype ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
              mimetype === "application/msword"
            ) {
              const stream = createReadStream();
              const { fileId } = await storeUpload(
                stream,
                mimetype,
                `public/cv`
              );

              const cvUploaded = await CV.create({
                routeCV: `cv/${fileId}`,
                filename,
                user: { id }
              }).save();

              return cvUploaded;
            }

            return cv;
          })
        );

        await Promise.all([
          UpdateCreate(Language, id, information.language),
          UpdateCreate(Study, id, information.study),
          UpdateCreate(Work, id, information.work),
          UpdateCreate(CV, id, saveCV)
        ]);

        return null;
      }
    )
  }
};
