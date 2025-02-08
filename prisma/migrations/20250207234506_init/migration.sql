-- CreateTable
CREATE TABLE "items" (
    "sku" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "price" MONEY NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("sku")
);
