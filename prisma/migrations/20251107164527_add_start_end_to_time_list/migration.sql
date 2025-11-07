/*
  Warnings:

  - You are about to drop the column `time` on the `TimeList` table. All the data in the column will be lost.
  - Added the required column `end` to the `TimeList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `TimeList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimeList" DROP COLUMN "time",
ADD COLUMN     "end" TEXT NOT NULL,
ADD COLUMN     "start" TEXT NOT NULL;
