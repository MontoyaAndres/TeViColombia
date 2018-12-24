import { University } from "../../../../entity/University";

async function university(id: any, information: any) {
  const query = await University.findOne({ where: { user: id } });

  if (query) {
    // Update university information
    if (information.university) {
      return information.university.map((uni: any) =>
        University.update({ id: uni.id }, { ...uni })
      );
    }
  } else {
    // Create new university
    return information.university.map((uni: any) =>
      University.create({ ...uni, user: id }).save()
    );
  }
}

export default university;
