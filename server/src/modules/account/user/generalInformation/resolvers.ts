import { ResolveMap } from "../../../../types/graphql-utils";
import { GQL } from "../../../../types/schema";
import { User } from "../../../../entity/User";
import { Language } from "../../../../entity/Language";
import { Study } from "../../../../entity/Study";
import { Work } from "../../../../entity/Work";
import { CV } from "../../../../entity/CV";
import { PreferWork } from "../../../../entity/PreferWork";
import saveData from "./saveData";
import { createMiddleware } from "../../../../utils/createMiddleware";
import { middleware } from "../../../shared/authMiddleware";
import { GeneralInformationValidation } from "../../../../utils/validation";
import { formatYupError } from "../../../../utils/formatYupError";
import { storeUpload, storeDelete } from "../../../../utils/storeUploadDelete";

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
      middleware.user,
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
            // Upload new file
            const stream = createReadStream();
            const { public_id, secure_url, resource_type } = await storeUpload(
              stream,
              `userPhoto`
            );

            // Delete old file
            const currentPublicId = await User.findOne({
              where: { id },
              select: ["cloudinaryPublicIdRoutePhoto"]
            });
            if (currentPublicId) {
              await storeDelete(
                [
                  {
                    public_id: currentPublicId.cloudinaryPublicIdRoutePhoto,
                    resource_type: "image"
                  }
                ],
                [{ public_id, resource_type }]
              );
            }

            await User.update(
              { id },
              {
                routePhoto: secure_url,
                cloudinaryPublicIdRoutePhoto: public_id
              }
            );
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
            // Upload new file
            const stream = createReadStream();
            const { public_id, secure_url, resource_type } = await storeUpload(
              stream,
              `userCover`
            );

            // Delete old file
            const currentPublicId = await User.findOne({
              where: { id },
              select: ["cloudinaryPublicIdRouteCover"]
            });
            if (currentPublicId) {
              await storeDelete(
                [
                  {
                    public_id: currentPublicId.cloudinaryPublicIdRouteCover,
                    resource_type: "image"
                  }
                ],
                [{ public_id, resource_type }]
              );
            }

            await User.update(
              { id },
              {
                routeCover: secure_url,
                cloudinaryPublicIdRouteCover: public_id
              }
            );
          } else {
            return [
              {
                path: "routeCover",
                message: "Por favor suba una imagen."
              }
            ];
          }
        }

        // If `isStudent` is false, it means the `universityCareer` should be empty, because is not an student or graduate from UNIMINUTO
        if (!information.isStudent && information.universityCareer) {
          information.universityCareer = null;
        }

        // `area` is only for university careers
        information.study.forEach(study => {
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
            isStudent: information.isStudent,
            universityCareer: information.universityCareer,
            skills: information.skills,
            socialnetwork: information.socialnetwork
          }
        );

        // Uploading all the `CV` files
        const saveCV = await Promise.all(
          information.cv.map(async cv => {
            const { createReadStream, mimetype, filename } = await cv;

            if (mimetype === "application/pdf") {
              const stream = createReadStream();
              const {
                public_id,
                secure_url,
                resource_type
              } = await storeUpload(stream, `cv`);

              const cvUploaded = await CV.create({
                cloudinaryPublicIdRouteCV: public_id,
                routeCV: secure_url,
                resourceType: resource_type,
                filename,
                user: { id }
              }).save();

              return cvUploaded;
            }

            return cv;
          })
        );

        // What `cv` is uploaded now
        const currentCV = await CV.find({
          where: { user: { id } },
          select: ["cloudinaryPublicIdRouteCV", "resourceType"]
        });
        const currentFiles = currentCV.map(cv => ({
          public_id: cv.cloudinaryPublicIdRouteCV,
          resource_type: cv.resourceType
        }));

        const newFiles = saveCV.map(cv => ({
          public_id: cv.cloudinaryPublicIdRouteCV,
          resource_type: cv.resourceType
        }));

        // Delete old `CV` files
        await storeDelete(currentFiles, newFiles);

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

        // Update rest of info
        await Promise.all([
          saveData(Language, id, information.language),
          saveData(Study, id, information.study),
          saveData(Work, id, information.work),
          saveData(CV, id, saveCV)
        ]);

        return null;
      }
    )
  }
};
