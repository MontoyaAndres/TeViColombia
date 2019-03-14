import { In } from "typeorm";
import * as DataLoader from "dataloader";

import { User } from "../entity/User";
import { Business } from "../entity/Business";

type BatchUserInformation = (ids: string[]) => Promise<User[]>;
type BatchBusinessInformation = (ids: string[]) => Promise<Business[]>;

const batchUserInformations: BatchUserInformation = async ids => {
  const user = await User.find({
    where: { id: In(ids) },
    relations: ["language", "study", "work", "preferwork", "cv"]
  });

  const userMap: { [key: string]: User } = {};
  user.forEach(u => {
    userMap[u.id] = u;
  });

  return ids.map(id => userMap[id]);
};

const batchBusinessInformation: BatchBusinessInformation = async ids => {
  const business = await Business.find({
    where: { id: In(ids) },
    relations: ["employ", "member"]
  });

  const businessMap: { [key: string]: Business } = {};
  business.forEach(b => {
    businessMap[b.id] = b;
  });

  return ids.map(id => businessMap[id]);
};

export const informationUserLoader = () =>
  new DataLoader<string, User>(batchUserInformations);

export const informationBusinessLoader = () =>
  new DataLoader<string, Business>(batchBusinessInformation);
