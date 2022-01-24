#import Error from "./shared/index.ts"
import gql from "graphql-tag";

const userTypeDef = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    lastName: String!
    firstName: String!
    age: Int!
  }

  input userInput {
    id: ID
    email: String
    password: String
    lastName: String
    firstName: String
    age: Int
  }

  type Query {
    users: [User]
    user(input: userInput): User
    userById(id: String): User
  }
  type Mutation {
    register(input: userInput!): Boolean
  }
`;

export default userTypeDef;
