/*
  Warnings:

  - You are about to drop the column `f_status` on the `friendships` table. All the data in the column will be lost.
  - Added the required column `fr_status` to the `friendships` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "friendships" DROP COLUMN "f_status",
ADD COLUMN     "fr_status" BOOLEAN NOT NULL;
