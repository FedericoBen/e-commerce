/*
  Warnings:

  - You are about to drop the `UserAdrress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserAdrress" DROP CONSTRAINT "UserAdrress_countryId_fkey";

-- DropForeignKey
ALTER TABLE "UserAdrress" DROP CONSTRAINT "UserAdrress_userId_fkey";

-- DropTable
DROP TABLE "UserAdrress";

-- CreateTable
CREATE TABLE "UserAddress" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "address2" TEXT,
    "postalCode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAddress_userId_key" ON "UserAddress"("userId");

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
