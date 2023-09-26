/*
  Warnings:

  - You are about to drop the column `login` on the `users` table. All the data in the column will be lost.
  - The `avatar` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[intra_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `intra_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "login",
ADD COLUMN     "intra_id" INTEGER NOT NULL,
DROP COLUMN "avatar",
ADD COLUMN     "avatar" BYTEA;

-- CreateIndex
CREATE UNIQUE INDEX "users_intra_id_key" ON "users"("intra_id");
