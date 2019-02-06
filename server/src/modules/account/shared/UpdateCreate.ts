async function UpdateCreate(
  Model: any,
  id: string,
  information: Array<any | null>
) {
  if (information) {
    const getAllIds = await Model.find({ where: { user: { id } } });
    const getAllIdsPassingArray = getAllIds.map((ids: any) => ids.id);

    const getAllIdsFromInformation = information
      .map(data => data.id)
      .filter(value => value);

    // Getting all ids the user is not using.
    const IdsUnused = getAllIdsPassingArray.filter(
      (value: any) => !getAllIdsFromInformation.includes(value)
    );

    // Removing all ids the user is not using.
    await IdsUnused.map((idsUnused: string) => Model.delete({ id: idsUnused }));

    // If id exists update data, if not create data.
    await information.map(data =>
      data.id
        ? Model.update({ id: data.id }, { ...data })
        : Model.create({ ...data, user: { id } }).save()
    );

    return true;
  }

  return true;
}

export default UpdateCreate;
