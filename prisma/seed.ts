import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const items = [
    { sku: "120P90", name: "Google Home", price: 49.99 },
    { sku: "43N23P", name: "Mac Pro", price: 5399.99 },
    { sku: "A304SD", name: "Alexa Speaker", price: 109.5 },
    { sku: "344222", name: "Raspberry Pi", price: 30.0 },
  ];

  for (const item of items) {
    await prisma.item.upsert({
      where: { sku: item.sku },
      update: {},
      create: item,
    });
  }

  console.log("Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
