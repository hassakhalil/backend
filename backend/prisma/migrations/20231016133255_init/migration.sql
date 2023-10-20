/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `rooms` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "friendships" ALTER COLUMN "fr_state" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "rooms_name_key" ON "rooms"("name");
