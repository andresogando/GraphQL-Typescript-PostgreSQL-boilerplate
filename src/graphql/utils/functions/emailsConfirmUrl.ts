import { Redis } from "ioredis";
import { v4 } from "uuid";
//1. receive url
//  localhost/confirm/:id
// my-site.com/confirm/:id

export const createEmailLink = async (
  url: string,
  userId: string,
  redis: Redis
) => {
  const uuid = v4();
  await redis.set(uuid, userId, "ex", 60 * 60 * 24);
  console.log( `${url}confirm/${uuid}`)
  return `${url}confirm/${uuid}`;
};
