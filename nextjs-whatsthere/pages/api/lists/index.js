import { db } from "../../../util/db.server";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { name, userId, attractions } = req.body;
    const newList = await db.lists.create({
      data: {
        name: name,
        user: {
          connect: { id: userId },
        },
        // attractions: attractions,
      },
    });
    res.status(200).json(newList);
  } else {
    const lists = await db.lists.findMany();
    res.status(200).json(lists);
  }
}