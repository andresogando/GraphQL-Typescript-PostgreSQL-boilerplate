import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import * as path from "path";
import resolvers from "@resolvers";
import { createTypeOrmConnection } from "@database";

const startServer = async () => {
  const typeDefs = importSchema(
    path.join(__dirname, "../graphql/typeDefs/*.ts"),
  );

  const server = new GraphQLServer({
    typeDefs,
    resolvers,
  });
  
  await createTypeOrmConnection();

  const PORT = process.env.NODE_ENV === "test" ? 0 : 4000;

  const app = await server.start({
    port: PORT,
  });

  console.log(`🚀: Server Running on: http://localhost:${PORT}`);

  return app;
};

export default startServer;
