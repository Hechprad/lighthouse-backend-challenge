import { Router, Request, Response } from "express";
import { Item } from "@prisma/client";

import prisma from "../../database/prisma-client";

const router = Router();

router.post("/item", async (req: Request, res: Response) => {
  const item: Omit<Item, "created_at" | "updated_at"> = req.body;

  if (!item.name || !item.price || !item.sku) {
    res.status(400).json({ error: "Invalid item data" });
  }

  const newItem = await prisma.item.create({
    data: item,
  });

  res.json(newItem);
});

export default router;
