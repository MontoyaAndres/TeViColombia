interface ItemAllIdsPassingtoUserArray {
  id: string;
}

async function UpdateCreate(
  Model: any,
  id: string,
  information: Array<any | null>
): Promise<any> {
  if (information) {
    const getAllIdsFromUser = await Model.find({
      where: { user: { id } },
      select: ["id"]
    });
    const getAllIdsPassingToUserArray: string[] = getAllIdsFromUser.map(
      (ids: ItemAllIdsPassingtoUserArray) => ids.id
    );

    // Removing `undefined` elements.
    const getAllIdsFromInformation = information
      .map(data => data.id)
      .filter(value => value);

    // Getting all ids the user is not using.
    const IdsUnused = getAllIdsPassingToUserArray.filter(
      value => !getAllIdsFromInformation.includes(value)
    );

    // Removing all ids the user is not using.
    const removeIds = IdsUnused.map((idsUnused: string) =>
      Model.delete({ id: idsUnused })
    );

    // If id exists update data, if not create data.
    const saveOrUpdateInfomation = information.map(data =>
      data.id
        ? Model.update({ id: data.id }, { ...data })
        : Model.create({ ...data, user: { id } }).save()
    );

    return Promise.all([removeIds, saveOrUpdateInfomation]);
  }

  return null;
}

export default UpdateCreate;
