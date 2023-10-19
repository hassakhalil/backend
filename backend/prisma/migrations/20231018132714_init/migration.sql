/*
  Warnings:

  - The `mute_start` column on the `managements` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mute_end` column on the `managements` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "managements" DROP COLUMN "mute_start",
ADD COLUMN     "mute_start" INTEGER,
DROP COLUMN "mute_end",
ADD COLUMN     "mute_end" INTEGER;
