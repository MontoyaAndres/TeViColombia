import { Redis } from "ioredis";
import {
  informationUserLoader,
  informationBusinessLoader
} from "../loaders/informationLoader";

interface Session extends Express.Session {
  userId?: string;
}

interface Context {
  redis: Redis;
  url: string;
  session: Session;
  request: Express.Request;
  informationUserLoader: ReturnType<typeof informationUserLoader>;
  informationBusinessLoader: ReturnType<typeof informationBusinessLoader>;
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
