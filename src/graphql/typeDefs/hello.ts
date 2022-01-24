import gql from "graphql-tag";

const helloTypeDef = gql`
  type Query {
    hello(name: String): String!
  }

  type Mutation {
    greet(name: String): String!
  }
`;

export default helloTypeDef;
