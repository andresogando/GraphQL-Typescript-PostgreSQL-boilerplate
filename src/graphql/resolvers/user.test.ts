import startServer from "@server/connection";
import { request } from "graphql-request";
import { userCreateMutation } from "../utils/constants/constants";
import { User } from "../../entity/User";

const user = {
  age: 19,
  firstName: "Rafael L.",
  lastName: "Trujillo",
  email: "ciudadTrujivllo@rd.com",
  password: "sfffs",
};

let getHost = () => "";

beforeAll(async () => {
  const app = await startServer();
  const { port } = app.getAddressInfo() as any;
  getHost = () => `http://127.0.0.1:${port}`;
});

describe("Register User",  () => {
  test("Check for duplicate emails", async () => {
    // Register a User
    const response = await request(
      getHost(),
      userCreateMutation(
        user.firstName,
        user.lastName,
        user.email,
        user.password,
        user.age
      )
    );

    expect(response).toEqual({ register: null });

    // Check new User.
    const newUser = await User.find({ where: { email: user.email } });
    expect(newUser).toHaveLength(1);

    // Check if it's the same email & if the password is hashed (not the same input).
    const usr = newUser[0];
    expect(usr.email).toEqual(user.email);
    expect(newUser[0].password).not.toEqual(user.password);

    // Try to register the same user (duplicate emails)
    const response2 = await request(
      getHost(),
      userCreateMutation(
        user.firstName,
        user.lastName,
        user.email,
        user.password,
        user.age
      )
    );

    expect(response2.register).toHaveLength(1);
    expect(response2.register[0]).toEqual({
      path: "email",
      message: "Already taken",
    });
  });

  test("test for bad emails", async () => {
    // catch bad email
    const response3 = await request(
      getHost(),
      userCreateMutation(
        user.firstName,
        user.lastName,
        "ghhj",
        user.password,
        user.age
      )
    );

    // catch bad email
    expect(response3.register).toHaveLength(1);
    expect(response3.register[0]).toEqual({
      path: "email",
      message: "email must be a valid email",
    });
  });



  test("check bad password", async () => {
    //catch bad pasword.
    const response4 = await request(
      getHost(),
      userCreateMutation(
        user.firstName,
        user.lastName,
        user.email,
        "2",
        user.age
      )
    );
    expect(response4.register).toHaveLength(1);
    expect(response4.register[0]).toEqual({
      path: "password",
      message: "password must be at least 3 characters",
    });
  });

  //catch bad pasword & bad email
  /*
  const response5 = await request(
    getHost(),
    userCreateMutation(user.firstName, user.lastName, "fdht", "2", user.age)
  );
  expect(response5.register).toHaveLength(2);
  expect(response5.register[0]).toEqual({
    register: [
      {
        path: "password",
        message: "password must be at least 3 characters",
      },
      {
        path: "email",
        message: "email must be a valid email",
      },
    ],
  });
  */
});
