import request from "supertest";

import { app } from "../..";
import prisma from "../../database/prisma-client";

import { SKU } from ".";

describe("POST /api/checkout", () => {
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    prisma.$disconnect();
    done();
  });

  it("should return 400 for invalid request", async () => {
    const response = await request(app).post("/api/checkout").send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid items array");
  });
  it("should return 200 for a valid request", async () => {
    const response = await request(app)
      .post("/api/checkout")
      .send({ items: [SKU.GoogleHome] });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("total", 49.99);
  });
  it("should apply Buy 3 Google Homes for the price of 2", async () => {
    const scannedItems = [SKU.GoogleHome, SKU.GoogleHome, SKU.GoogleHome];

    const response = await request(app)
      .post("/api/checkout")
      .send({ items: scannedItems });

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(99.98);
  });
  it("should apply a free Raspberry Pi with each Mac Pro", async () => {
    const scannedItems = [SKU.RaspberryPi, SKU.MacPro];
    const response = await request(app)
      .post("/api/checkout")
      .send({ items: scannedItems });
    expect(response.status).toBe(200);
    expect(response.body.total).toBe(5399.99);
  });
  it("should apply a 10% discount on all Alexa Speakers when buying more than 3", async () => {
    const scannedItems = [
      SKU.AlexaSpeaker,
      SKU.AlexaSpeaker,
      SKU.AlexaSpeaker,
      SKU.AlexaSpeaker,
    ];
    const response = await request(app)
      .post(`/api/checkout`)
      .send({ items: scannedItems });
    expect(response.status).toBe(200);
    expect(response.body.total).toBeCloseTo(394.2, 2);
  });
});
