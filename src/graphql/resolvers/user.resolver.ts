import { ResolverMap } from "../utils/types/graphql-utils";
import * as bcrypt from "bcrypt";
import { User } from "../../entity/User";
import { userAlreadyExistError } from "./shared/errorMessages";
import { userSchema, formatYupError } from "./utils";
import { createEmailLink } from "../utils/functions/emailsConfirmUrl";

const userResolver: ResolverMap = {
  Query: {
    users: (_) => User.find(),
  },

  Mutation: {
    register: async (
      _: any,
      { input }: GQL.IRegisterOnMutationArguments,
      { redis, request }
    ) => {
      try {
        await userSchema.validate(input, { abortEarly: false });
      } catch (error) {
        return formatYupError(error);
      }
      const { email, firstName, lastName, age, password } = input;

      const userAlreadyExist = await User.findOne({
        where: { email },
        select: ["id"],
      });

      if (userAlreadyExist) return userAlreadyExistError;

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        age,
      });

      await newUser.save();

      createEmailLink(request.url, newUser.id, redis);

      return null;
    },
  },
};

export default userResolver;
