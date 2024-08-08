/*
  Warnings:

  - You are about to drop the column `majorRoll` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "majorRoll",
ADD COLUMN     "major" TEXT;
