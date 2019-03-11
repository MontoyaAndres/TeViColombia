import { User } from "../../entity/User";
import { Business } from "../../entity/Business";

const isAuthenticated = async (
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  // Authentication in general.
  if (!context.session.userId) {
    throw new Error("not authenticated from graphql middleware");
  }

  return resolve(parent, args, context, info);
};

const isUserAuthenticated = async (
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  // Authentication for user.
  const user = await User.findOne({ where: { id: context.session.userId } });

  if (!user) {
    throw new Error("not authenticated from graphql middleware");
  }

  return resolve(parent, args, context, info);
};

const isBusinessAuthenticated = async (
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  // Authentication for business.
  const business = await Business.findOne({
    where: { id: context.session.userId }
  });

  if (!business) {
    throw new Error("not authenticated from graphql middleware");
  }

  return resolve(parent, args, context, info);
};

export const middleware = {
  auth: isAuthenticated,
  user: isUserAuthenticated,
  business: isBusinessAuthenticated
};
