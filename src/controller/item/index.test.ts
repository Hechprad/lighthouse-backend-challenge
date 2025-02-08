import request from "supertest";

import { app, server } from "../..";
import prisma from "../../database/prisma-client";

describe("Item routes", () => {
  afterAll((done) => {
    server.close(done);
  });

  afterEach(async () => {
    await prisma.item.deleteMany({});
  });

  describe("POST /api/item", () => {
    it("should create a new item", async () => {
      const newItem = {
        name: "Test Item",
        price: 10.99,
        sku: "12345",
      };

      const response = await request(app)
        .post("/api/item")
        .send(newItem)
        .expect(200);

      expect(response.body).toHaveProperty("sku", "12345");
      expect(response.body).toHaveProperty("name", "Test Item");
      expect(response.body).toHaveProperty("price", 10.99);
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
      const skuToDelete = {
        name: "Test Item",
        price: 10.99,
        sku: "12345",
      };

      await request(app).post("/api/item").send(skuToDelete).expect(200);

      const response = await request(app)
        .delete(`/api/item/${skuToDelete.sku}`)
        .expect(204); // No content returned

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
      const skuToDelete = {
        name: "Test Item",
        price: 10.99,
        sku: "12345",
      };

      await request(app).post("/api/item").send(skuToDelete).expect(200);

      const response = await request(app).get("/api/items").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0); // Assuming there are items in the database
    });
  });

  describe("GET /api/item/:sku", () => {
    it("should return a specific item by SKU", async () => {
      const skuToDelete = {
        name: "Test Item",
        price: 10.99,
        sku: "12345",
      };

      await request(app).post("/api/item").send(skuToDelete).expect(200);

      const sku = "12345"; // Use an existing SKU in the database

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
