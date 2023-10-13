/*
  Warnings:

  - A unique constraint covering the columns `[acceptor_id,sender_id]` on the table `friendships` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "friendships" ADD COLUMN     "is_acceptor_blocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_sender_blocked" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "friendships_acceptor_id_sender_id_key" ON "friendships"("acceptor_id", "sender_id");
