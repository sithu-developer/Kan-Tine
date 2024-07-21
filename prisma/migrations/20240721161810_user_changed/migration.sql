/*
  Warnings:

  - You are about to drop the column `hostel` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `major` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `room` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hostel",
DROP COLUMN "major",
DROP COLUMN "room";
