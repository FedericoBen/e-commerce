/*
  Warnings:

  - You are about to drop the column `itemInOrder` on the `Order` table. All the data in the column will be lost.
  - Added the required column `itemsInOrder` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "itemInOrder",
ADD COLUMN     "itemsInOrder" INTEGER NOT NULL;
