import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as RateLimit from "express-rate-limit";
import * as RateLimitRedisStore from "rate-limit-redis";
import * as compression from "compression";
import * as helmet from "helmet";
import * as express from "express";

import { createTypeormConn } from "./utils/createTypeormConn";
import { redis } from "./redis";
import { genSchema } from "./utils/genSchema";
import Routes from "./routes";
import { redisSessionPrefix } from "./constants";
import { informationLoader } from "./loaders/informationLoader";

const RedisStore = connectRedis(session);

export async function startServer() {
  const server = new GraphQLServer({
    schema: genSchema() as any,
    context: ({ request }) => ({
      redis,
      url: request.protocol + "://" + request.get("host"),
      session: request.session,
      request,
      informationLoader: informationLoader()
    })
  });

  server.express
    .use(express.static(`${__dirname}/../public`))
    .use(compression())
    .use(helmet())
    .use(
      new RateLimit({
        store: new RateLimitRedisStore({
          client: redis
        }),
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
        delayMs: 0 // Disable delaying - full speed until the max limit is reached
      })
    )
    .use(
      session({
        store: new RedisStore({
          client: redis as any,
          prefix: redisSessionPrefix
        }),
        name: "qid",
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Only works with https
          maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        }
      })
    )
    .use(Routes);

  await createTypeormConn();

  const app = await server.start({
    cors: { credentials: true, origin: process.env.FRONTEND_HOST },
    port: 4000
  });

  return app;
}
