import { startServer } from "../../config/startServer";
import { request } from "graphql-request";
import { server, userCreateMutation } from "../utils/constants/constants";
import { User } from "../../models/User";
import { user as testUser } from "../utils/constants/constants";

let getHost = () => "";

beforeAll(async () => {
  const app = await startServer();
  const { port } = app.address();
  getHost = () => `http://127.0.0.1:${port}`;
});

test("Register User", async () => {
  const response = await request(getHost(), userCreateMutation);
  expect(response).toEqual({ register: true });
  const newUser = await User.find({ where: { email: testUser.email } });
  expect(newUser).toHaveLength(1);
  const usr = newUser[0];
  expect(usr.email).toEqual(testUser.email);
  expect(newUser.password).not.toEqual(testUser.password);
});
