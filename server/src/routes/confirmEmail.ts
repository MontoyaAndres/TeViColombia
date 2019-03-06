import { Request, Response } from "express";

import { User } from "../entity/User";
import { redis } from "../redis";
import { Business } from "../entity/Business";

export const confirmEmail = async (req: Request, res: Response) => {
  const { id, type } = req.params;
  const userId = await redis.get(id);

  if (userId) {
    if (type === "User") {
      await User.update({ id: userId }, { confirmed: true });
    } else if (type === "Business") {
      await Business.update({ id: userId }, { confirmed: true });
    }

    await redis.del(id);
    res.redirect(`${process.env.FRONTEND_HOST}/login`);
  } else {
    res.redirect(`${process.env.FRONTEND_HOST}/register`);
  }
};
