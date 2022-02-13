import { Router } from "express";
import { redis } from "src/config/redis";
import { User } from "src/entity/User";

const router = Router();

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const userId = (await redis.get(id)) as string;
  if (userId) {
    const confirmUser = await User.update(
      {
        id: userId,
      },
      { confirmed: true }
    );
    res.sendStatus(200)
  } else {
    next("Invalid");
  }
});

export default router;
