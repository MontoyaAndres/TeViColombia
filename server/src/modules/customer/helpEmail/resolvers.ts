import { ResolveMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { helpReceiveEmail } from "../../../utils/sendEmail";
import { HelpEmailValidation } from "../../../utils/validation";
import { formatYupError } from "../../../utils/formatYupError";

export const resolvers: ResolveMap = {
  Mutation: {
    helpEmail: async (
      _,
      { name, email, message }: GQL.IHelpEmailOnMutationArguments
    ) => {
      try {
        await HelpEmailValidation.validate(
          { name, email, message },
          { abortEarly: false }
        );
      } catch (err) {
        return formatYupError(err);
      }

      helpReceiveEmail(name, email, message);
      return null;
    }
  }
};
