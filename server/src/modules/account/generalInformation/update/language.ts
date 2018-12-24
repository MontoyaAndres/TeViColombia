import { Languages } from "../../../../entity/Languages";

async function language(id: any, information: any) {
  const query = await Languages.findOne({ where: { user: id } });

  if (query) {
    // Update language information
    if (information.language) {
      return information.language.map((lang: any) =>
        Languages.update({ id: lang.id }, { ...lang })
      );
    }
  } else {
    // Create new language
    return information.language.map((lang: any) =>
      Languages.create({ ...lang, user: id }).save()
    );
  }
}

export default language;
