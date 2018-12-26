async function UpdateCreate(Model: any, id: any, information: any) {
  // Check if the user exists in any model.
  const query = await Model.findOne({ where: { user: id } });

  if (query) {
    // If the user exists in any model, this user will insert or update any data.
    if (information) {
      return information.map((data: any) =>
        data.id
          ? Model.update({ id: data.id }, { ...data })
          : Model.create({ ...data, user: id }).save()
      );
    }
  } else {
    // If is the first time, all the data will be create.
    if (information) {
      return information.map((data: any) =>
        Model.create({ ...data, user: id }).save()
      );
    }
  }
}

export default UpdateCreate;
