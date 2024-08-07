/*
  Warnings:

  - Added the required column `totalMonths` to the `PayAndEndDate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PayAndEndDate" ADD COLUMN     "totalMonths" INTEGER NOT NULL;
