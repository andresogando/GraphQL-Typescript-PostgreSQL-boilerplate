import { ResolverMap } from "../utils/types/graphql-utils";
import * as bcrypt from "bcrypt";
import { User } from "../../models/User";

const userResolver: ResolverMap = {
  Query: {
    users: (_) => User.find(),
   
  },

  Mutation: {
    register: async (
      _: any,
      {
        input: { email, password, firstName, lastName, age },
      }: GQL.IRegisterOnMutationArguments,
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        age,
      });

      await newUser.save();
      return true;
    },
  },
};

export default userResolver;
