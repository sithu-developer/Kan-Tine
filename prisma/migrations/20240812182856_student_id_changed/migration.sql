/*
  Warnings:

  - You are about to drop the column `customerId` on the `PayAndEndDate` table. All the data in the column will be lost.
  - Added the required column `studentId` to the `PayAndEndDate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PayAndEndDate" DROP CONSTRAINT "PayAndEndDate_customerId_fkey";

-- AlterTable
ALTER TABLE "PayAndEndDate" DROP COLUMN "customerId",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PayAndEndDate" ADD CONSTRAINT "PayAndEndDate_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
