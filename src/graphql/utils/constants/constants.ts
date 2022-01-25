export const server = `http://localhost:4000`;


export const userCreateMutation = (
  fname: string,
  lname: string,
  email: string,
  password: string,
  age: number,
) => `
mutation {
  register(input:{firstName: "${fname}" lastName:"${lname}" email:"${email}" password:"${password}" age:${age}}){
    path
    message
  }
}

`;
