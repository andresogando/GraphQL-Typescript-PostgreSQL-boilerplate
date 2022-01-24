import { createConnection, getConnectionOptions } from "typeorm";

export const createTypeOrmConnection = async () => {
  const options = await getConnectionOptions(process.env.NODE_ENV);
  return await createConnection({ ...options, name: "default" }).then((e) =>
    console.log(`📡 Database Connection to: [ ${e.options.database} ]  Success`),
  );
};
