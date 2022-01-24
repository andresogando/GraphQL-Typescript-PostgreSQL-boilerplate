export const server = `http://localhost:4000`;

export const user = {
  age: 19,
  firstName: "Rafael L.",
  lastName: "Trujillo",
  email: "ciudadTrujivllo@rd.com",
  password: "vivaeljefe",
};

export const userCreateMutation = `
mutation {
  register(input:{firstName: "${user.firstName}" lastName:"${user.lastName}" email:"${user.email}" password:"${user.password}" age:${user.age} })
}

`;
