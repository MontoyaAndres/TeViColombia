import { Redis } from "ioredis";
import { informationLoader } from "../loaders/informationLoader";

interface Session extends Express.Session {
  userId?: string;
}

interface Context {
  redis: Redis;
  url: string;
  session: Session;
  request: Express.Request;
  informationLoader: ReturnType<typeof informationLoader>;
}

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export type GraphQLMiddlewareFunc = (
  resolver: Resolver,
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface ResolveMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}
