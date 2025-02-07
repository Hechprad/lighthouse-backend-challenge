import { Router, Request, Response } from "express";

import * as t from "./types";

const router = Router();

const products: t.Products = {
  [t.SKU.AlexaSpeaker]: { name: "Alexa Speaker", price: 109.5 },
  [t.SKU.GoogleHome]: { name: "Google Home", price: 49.99 },
  [t.SKU.MacPro]: { name: "Mac Pro", price: 5399.99 },
  [t.SKU.RaspberryPi]: { name: "Raspberry Pi", price: 30.0 },
};

router.post("/checkout", (req: Request, res: Response): any => {
  const { items }: { items: string[] } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({ error: "Invalid items array" });
  }

  let total = 0;
  const itemCounts: Record<string, number> = {};

  items.forEach((sku) => {
    if (products[sku]) {
      total += products[sku].price;
      itemCounts[sku] = (itemCounts[sku] || 0) + 1;
    }
  });

  // Promoções
  // 1. Buy 3 Google Homes for the price of 2
  if (itemCounts[t.SKU.GoogleHome] >= 3) {
    const discountUnits = Math.floor(itemCounts[t.SKU.GoogleHome] / 3);
    total -= discountUnits * products[t.SKU.GoogleHome].price;
  }

  // 2. Each MacBook Pro comes with a free Raspberry Pi
  if (itemCounts[t.SKU.MacPro] > 0 && itemCounts[t.SKU.RaspberryPi] > 0) {
    const freeUnits = Math.min(
      itemCounts[t.SKU.MacPro],
      itemCounts[t.SKU.RaspberryPi]
    );
    total -= freeUnits * products[t.SKU.RaspberryPi].price;
  }

  // 3. 10% off for more than 3 Alexa Speakers
  if (itemCounts[t.SKU.AlexaSpeaker] > 3) {
    total -=
      itemCounts[t.SKU.AlexaSpeaker] * products[t.SKU.AlexaSpeaker].price * 0.1;
  }

  res.json({ total: Number(total.toFixed(2)) });
});

export default router;
