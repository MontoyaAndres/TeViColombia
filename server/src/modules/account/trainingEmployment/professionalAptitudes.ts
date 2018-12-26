import { ProfessionalAptitude } from "../../../entity/ProfessionalAptitude";

async function professionalAptitudes(id: any, information: any) {
  // Check if the user exists in the model.
  const query = await ProfessionalAptitude.findOne({ where: { user: id } });

  if (query) {
    // If the user exists in the model, this user will update the data.
    // The user can't add more than one array of professional aptitudes.
    if (information) {
      return ProfessionalAptitude.update(
        { id: information.professionalAptitude.id },
        { ...(information.professionalAptitude as any) }
      );
    }
  } else {
    // If is the first time, all the data will be create.
    if (information) {
      return ProfessionalAptitude.create({
        ...(information.professionalAptitude as any),
        user: id
      }).save();
    }
  }

  return null;
}

export default professionalAptitudes;
