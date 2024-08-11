/*
  Warnings:

  - Added the required column `breakFast` to the `PayAndEndDate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dinner` to the `PayAndEndDate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPaidUp` to the `PayAndEndDate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lunch` to the `PayAndEndDate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PayAndEndDate" ADD COLUMN     "breakFast" BOOLEAN NOT NULL,
ADD COLUMN     "dinner" BOOLEAN NOT NULL,
ADD COLUMN     "isDone" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPaidUp" BOOLEAN NOT NULL,
ADD COLUMN     "lunch" BOOLEAN NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;
