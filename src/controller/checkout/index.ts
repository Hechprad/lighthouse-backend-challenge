import { Router, Request, Response } from "express";

import prisma from "../../database/prisma-client";

const router = Router();

export enum SKU {
  GoogleHome = "120P90",
  MacPro = "43N23P",
  AlexaSpeaker = "A304SD",
  RaspberryPi = "344222",
}

router.post("/checkout", async (req: Request, res: Response) => {
  const { items }: { items: string[] } = req.body;

  if (!items || !items.length) {
    res.status(400).json({ error: "Invalid items array" });
    return;
  }

  let total = 0;
  const itemCounts: Record<string, number> = {};
  const checkoutItems: Record<string, number> = {};

  try {
    const itemPromises = items.map((sku) =>
      prisma.item.findUnique({ where: { sku } })
    );

    const results = await Promise.all(itemPromises);

    if (results.length) {
      results.forEach((item) => {
        if (!item) {
          res.status(404).json({ error: "Item not found" });
          return;
        }

        total += Number(item.price);
        itemCounts[item.sku] = (itemCounts[item.sku] || 0) + 1;
        checkoutItems[item.sku] = Number(item.price);
      });
    }

    // 1. Buy 3 Google Homes for the price of 2
    if (itemCounts[SKU.GoogleHome] >= 3) {
      const discountUnits = Math.floor(itemCounts[SKU.GoogleHome] / 3);
      total -= discountUnits * checkoutItems[SKU.GoogleHome];
    }

    // 2. Each MacBook Pro comes with a free Raspberry Pi
    if (itemCounts[SKU.MacPro] > 0 && itemCounts[SKU.RaspberryPi] > 0) {
      const freeUnits = Math.min(
        itemCounts[SKU.MacPro],
        itemCounts[SKU.RaspberryPi]
      );
      total -= freeUnits * checkoutItems[SKU.RaspberryPi];
    }

    // 3. 10% off for more than 3 Alexa Speakers
    if (itemCounts[SKU.AlexaSpeaker] > 3) {
      total -=
        itemCounts[SKU.AlexaSpeaker] * checkoutItems[SKU.AlexaSpeaker] * 0.1;
    }

    res.json({ total: Number(total.toFixed(2)) });
  } catch (error) {
    res.status(500).json({
      error: "Failed to checkout",
      details: (error as { message?: string }).message,
    });
  }
});

export default router;
