/*
  Warnings:

  - You are about to drop the column `isArchived` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `isArchived` on the `Hostel` table. All the data in the column will be lost.
  - You are about to drop the column `isArchived` on the `PayAndEndDate` table. All the data in the column will be lost.
  - You are about to drop the column `isArchived` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `isArchived` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "isArchived";

-- AlterTable
ALTER TABLE "Hostel" DROP COLUMN "isArchived";

-- AlterTable
ALTER TABLE "PayAndEndDate" DROP COLUMN "isArchived";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "isArchived";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isArchived";
