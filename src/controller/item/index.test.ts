import request from "supertest";
import { Item } from "@prisma/client";

import { app } from "../..";
import prisma from "../../database/prisma-client";

const newItem = {
  name: "Test Item",
  price: 10.99,
  sku: "12345",
};

const addNewItem = async () => {
  const item = (await prisma.item.findFirst({
    where: {
      sku: newItem.sku,
    },
  })) as unknown as Item;

  if (item) {
    return item;
  }

  const response = await request(app)
    .post("/api/item")
    .send(newItem)
    .expect(200);
  return response.body as Item;
};

describe("Item routes", () => {
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    prisma.$disconnect();
    done();
  });

  afterEach(async () => {
    const item = await prisma.item.findFirst({ where: { sku: newItem.sku } });

    if (item) {
      await prisma.item.delete({ where: { sku: newItem.sku } });
    }
  });

  describe("POST /api/item", () => {
    it("should create a new item", async () => {
      const item = await addNewItem();

      expect(item).toHaveProperty("sku", "12345");
      expect(item).toHaveProperty("name", "Test Item");
      expect(item).toHaveProperty("price", 10.99);
    });

    it("should return 400 for invalid data", async () => {
      const invalidItem = {
        name: "Invalid Item",
      };

      const response = await request(app)
        .post("/api/item")
        .send(invalidItem)
        .expect(400);

      expect(response.body).toHaveProperty("error", "Invalid item data");
    });
  });

  describe("DELETE /api/item/:sku", () => {
    it("should delete an item by SKU", async () => {
      await addNewItem();

      const response = await request(app)
        .delete(`/api/item/${newItem.sku}`)
        .expect(204);

      expect(response.body).toEqual({});
    });
    it("should return 404 for invalid SKU", async () => {
      const invalidSku = "99999"; // SKU that doesn't exist
      const response = await request(app)
        .delete(`/api/item/${invalidSku}`)
        .expect(404);

      expect(response.body).toHaveProperty("error", "Item not found");
    });
  });

  describe("GET /api/items", () => {
    it("should return a list of all items", async () => {
      await addNewItem();

      const response = await request(app).get("/api/items").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /api/item/:sku", () => {
    it("should return a specific item by SKU", async () => {
      await addNewItem();

      const sku = newItem.sku;
      const response = await request(app).get(`/api/item/${sku}`).expect(200);

      expect(response.body).toHaveProperty("sku", sku);
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("price");
    });
    it("should return 404 if item is not found", async () => {
      const invalidSku = "99999";
      const response = await request(app)
        .get(`/api/item/${invalidSku}`)
        .expect(404);

      expect(response.body).toHaveProperty("error", "Item not found");
    });
  });
});
