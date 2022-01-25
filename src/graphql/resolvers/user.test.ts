import startServer from "@server/connection";
import { request } from "graphql-request";
import { userCreateMutation } from "../utils/constants/constants";
import { User } from "../../entity/User";

const user = {
  age: 19,
  firstName: "Rafael L.",
  lastName: "Trujillo",
  email: "ciudadTrujivllo@rd.com",
  password: "ss",
};

let getHost = () => "";

beforeAll(async () => {
  const app = await startServer();
  const { port } = app.getAddressInfo() as any;
  getHost = () => `http://127.0.0.1:${port}`;
});

test("Register User", async () => {
  // Register a User
  const response = await request(
    getHost(),
    userCreateMutation(
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.age,
    ),
  );

  expect(response).toEqual({ register: null });

  // Check new User.
  const newUser = await User.find({ where: { email: testUser.email } });
  expect(newUser).toHaveLength(1);

  // Check if it's the same email & if the password is hashed (not the same input).
  const usr = newUser[0];
  expect(usr.email).toEqual(testUser.email);
  expect(newUser[0].password).not.toEqual(testUser.password);

  // Try to register the same user (duplicate emails)
  const response2 = await request(
    getHost(),
    userCreateMutation(
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.age,
    ),
  );
  expect(response2.register).toHaveLength(1);
  expect(response2.register[0].path).toEqual("Email");

  // catch bad email
  const response3 = await request(
    getHost(),
    userCreateMutation(
      user.firstName,
      user.lastName,
      "bb",
      user.password,
      user.age,
    ),
  );
  expect(response3.register).toHaveLength(1);
  expect(response3.register[0].path).toEqual("Email");  
});
