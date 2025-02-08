import { Router, Request, Response } from "express";
import { Item } from "@prisma/client";

import prisma from "../../database/prisma-client";

const router = Router();

router.post("/item", async (req: Request, res: Response) => {
  const item: Omit<Item, "created_at" | "updated_at"> = req.body;

  if (!item.name || !item.price || !item.sku) {
    res.status(400).json({ error: "Invalid item data" });
  }

  try {
    const newItem = await prisma.item.create({
      data: item,
    });

    res.json(newItem);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create item",
      details: (error as { message?: string }).message,
    });
  }
});

router.delete("/item/:sku", async (req: Request, res: Response) => {
  const { sku } = req.params;

  if (!sku) {
    res.status(400).json({ error: "Invalid SKU" });
  }

  try {
    await prisma.item.delete({
      where: {
        sku: sku,
      },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete item",
      details: (error as { message?: string }).message,
    });
  }
});

router.get("/items", async (req: Request, res: Response) => {
  try {
    const items = await prisma.item.findMany();

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch items",
      details: (error as { message?: string }).message,
    });
  }
});

export default router;
