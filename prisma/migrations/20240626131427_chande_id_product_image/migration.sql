/*
  Warnings:

  - The primary key for the `ProductImage` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProductImage_id_seq";
