/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Stat` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Stat_userId_key" ON "Stat"("userId");
