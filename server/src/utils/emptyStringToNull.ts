import { ValueTransformer } from "typeorm";

// Passing all the values with an empty string "" to null.

export default class EmptyStringToNull implements ValueTransformer {
  to(value: string): string | null {
    if (value === "") {
      return null;
    }

    return value;
  }

  from(value: string): string {
    return value;
  }
}
