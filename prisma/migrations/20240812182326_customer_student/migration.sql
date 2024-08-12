/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_hostelId_fkey";

-- DropForeignKey
ALTER TABLE "PayAndEndDate" DROP CONSTRAINT "PayAndEndDate_customerId_fkey";

-- DropTable
DROP TABLE "Customer";

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "major" TEXT,
    "hostelId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayAndEndDate" ADD CONSTRAINT "PayAndEndDate_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
