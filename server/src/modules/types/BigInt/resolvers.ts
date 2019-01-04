// Code by https://github.com/stems/graphql-bigint/blob/master/index.js

import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language/kinds";

import { ResolveMap } from "../../../types/graphql-utils";

const MAX_INT = Number.MAX_SAFE_INTEGER;
const MIN_INT = Number.MIN_SAFE_INTEGER;

export const resolvers: ResolveMap = {
  BigInt: new GraphQLScalarType({
    name: "BigInt",
    description:
      "The `BigInt` scalar type represents non-fractional signed whole numeric " +
      "values. BigInt can represent values between -(2^53) + 1 and 2^53 - 1. ",
    parseValue: coerceBigInt,
    serialize: coerceBigInt,
    parseLiteral(ast: any) {
      if (ast.kind === Kind.INT) {
        const num = parseInt(ast.value, 10);
        if (num <= MAX_INT && num >= MIN_INT) {
          return num;
        } else {
          throw new TypeError("wrong value " + String(ast.value));
        }
      }
      return null;
    }
  }) as any
};

function coerceBigInt(value: any) {
  if (value === "") {
    throw new TypeError(
      "BigInt cannot represent non 53-bit signed integer value: (empty string)"
    );
  }
  const num = Number(value);
  if (num !== num || num > MAX_INT || num < MIN_INT) {
    throw new TypeError(
      "BigInt cannot represent non 53-bit signed integer value: " +
        String(value)
    );
  }
  const int = Math.floor(num);
  if (int !== num) {
    throw new TypeError(
      "BigInt cannot represent non-integer value: " + String(value)
    );
  }
  return int;
}
