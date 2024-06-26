/*
  Warnings:

  - You are about to drop the column `transctionId` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "transctionId",
ADD COLUMN     "transactionId" TEXT;
