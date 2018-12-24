import { PersonalSocialNetworks } from "../../../../entity/PersonalSocialNetworks";

async function socialnetwork(id: any, information: any) {
  const query = await PersonalSocialNetworks.findOne({
    where: { user: id }
  });

  if (query) {
    // Update socialnetwork information
    if (information.socialnetwork) {
      return information.socialnetwork.map((sn: any) =>
        PersonalSocialNetworks.update({ id: sn.id }, { ...sn })
      );
    }
  } else {
    // Create new socialnetwork
    return information.socialnetwork.map((sn: any) =>
      PersonalSocialNetworks.create({ ...sn, user: id }).save()
    );
  }
}

export default socialnetwork;
