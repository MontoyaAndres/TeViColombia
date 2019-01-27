// Code by https://www.apollographql.com/docs/graphql-tools/scalars.html#Date-as-a-scalar

import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

import { ResolveMap } from "../../../types/graphql-utils";

export const resolvers: ResolveMap = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return value; // value from the client
    },
    serialize(value) {
      return value; // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    }
  }) as any
};
