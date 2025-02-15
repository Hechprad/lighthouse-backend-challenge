import { Router, Request, Response } from "express";
import { Item } from "@prisma/client";

import prisma from "../../database/prisma-client";
import { Decimal } from "@prisma/client/runtime/library";

const router = Router();

router.post("/item", async (req: Request, res: Response) => {
  const item: Omit<Item, "created_at" | "updated_at"> = req.body;

  if (!item.name || !item.price || !item.sku) {
    res.status(400).json({ error: "Invalid item data" });
    return;
  }

  try {
    const newItem = await prisma.item.create({
      data: item,
    });

    if (newItem.price) {
      newItem.price = parseFloat(
        newItem.price.toString()
      ) as unknown as Decimal;
    }

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

  try {
    const item = await prisma.item.findUnique({
      where: {
        sku,
      },
    });

    if (!item) {
      res.status(404).json({ error: "Item not found" });
      return;
    }

    await prisma.item.delete({
      where: {
        sku,
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

router.get("/item/:sku", async (req: Request, res: Response) => {
  const { sku } = req.params;

  try {
    const item = await prisma.item.findUnique({
      where: {
        sku,
      },
    });

    if (!item) {
      res.status(404).json({ error: "Item not found" });
      return;
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch item",
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
