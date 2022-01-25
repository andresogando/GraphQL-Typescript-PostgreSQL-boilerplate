import "reflect-metadata";
// import { GraphQLServer } from "graphql-yoga";
import { createServer } from "@graphql-yoga/node";
import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import resolvers from "@resolvers";
import { createTypeOrmConnection } from "@database";

const startServer = async () => {
  const typeDefs = await loadSchema("./src/graphql/typeDefs/*.graphql", {
    loaders: [new GraphQLFileLoader()],
  });

  await createTypeOrmConnection();

  const PORT = process.env.NODE_ENV === "test" ? 4001 : 4000;

  const server = createServer({
    schema: { typeDefs, resolvers },
    port: PORT,
    hostname: "127.0.0.1"
  });

  await server.start();

  console.log(`🚀: Server Running on: http://localhost:${PORT}`);

  console.log(server.getAddressInfo())
  
  return server;
};

export default startServer;
