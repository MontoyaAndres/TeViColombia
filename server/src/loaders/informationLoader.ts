import { In } from "typeorm";
import * as DataLoader from "dataloader";

import { User } from "../entity/User";

type BatchInformation = (ids: string[]) => Promise<User[]>;

const batchInformations: BatchInformation = async ids => {
  const user = await User.find({
    where: { id: In(ids) },
    relations: [
      "socialnetwork",
      "language",
      "university",
      "secondaryschool",
      "work",
      "professionalAptitude",
      "cv",
      "feedback",
      "necessity",
      "commercialEstablishment"
    ]
  });

  const userMap: { [key: string]: User } = {};
  user.forEach(u => {
    userMap[u.id] = u;
  });

  return ids.map(id => userMap[id]);
};

export const informationLoader = () =>
  new DataLoader<string, User>(batchInformations);
