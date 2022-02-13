import "reflect-metadata";
import * as express from "express";
import { createServer } from "@graphql-yoga/node";
import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import resolvers from "@resolvers";
import { createTypeOrmConnection } from "@database";
import { redis } from "./redis";

//routes
import emailsHandler from "../routes/emails";

const app = express();
const PORT = process.env.NODE_ENV === "test" ? 4001 : 4000;

const startServer = async () => {
  const typeDefs = await loadSchema("./src/graphql/typeDefs/*.graphql", {
    loaders: [new GraphQLFileLoader()],
  });

  await createTypeOrmConnection();

  const server = createServer({
    schema: { typeDefs, resolvers },
    port: PORT,
    hostname: "127.0.0.1",
    plugins: [],
    context: async (context) => {
      const { request } = context;

      redis.on("error", (error) => {
        console.error(error);
      });

      return { request, redis };
    },
  });

  app.use("/graphql", server.requestListener);
  return server;
};

app.use("/confirm", emailsHandler);

app.get("/", (req, res) => {
  res.send(`${req.hostname}`);
});

app.listen(PORT, () => {
  console.info(
    `🚀: GraphQL-Server Running on: http://localhost:${PORT}/graphql`
  );

  console.log(`🚀: Server Running on: http://localhost:${PORT}`);
});

export default startServer;
