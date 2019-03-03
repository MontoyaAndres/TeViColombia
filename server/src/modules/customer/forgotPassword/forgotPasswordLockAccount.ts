import { Redis } from "ioredis";
import { removeAllUsersSessions } from "../../../utils/removeAllUsersSessions";
import { User } from "../../../entity/User";
import { Business } from "../../../entity/Business";

export const forgotPasswordLockAccount = async (
  userId: string,
  type: string,
  redis: Redis
) => {
  // can't login
  if (type === "User") {
    await User.update({ id: userId }, { forgotPasswordLocked: true });
  } else if (type === "Business") {
    await Business.update({ id: userId }, { forgotPasswordLocked: true });
  }

  // remove all sessions
  await removeAllUsersSessions(userId, redis);
};
