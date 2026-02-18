/*
  Warnings:

  - You are about to drop the column `difficulty` on the `AiSuggestion` table. All the data in the column will be lost.
  - You are about to drop the column `avgLatency` on the `WeakKeyStat` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `WeakKeyStat` table. All the data in the column will be lost.
  - You are about to drop the column `totalPress` on the `WeakKeyStat` table. All the data in the column will be lost.
  - You are about to alter the column `avgTime` on the `WeakWordStat` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - A unique constraint covering the columns `[userId,char]` on the table `WeakKeyStat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `attempts` to the `WeakKeyStat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `char` to the `WeakKeyStat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expectedChar` to the `WeakKeyStat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTime` to the `WeakWordStat` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "WeakKeyStat_userId_key_key";

-- AlterTable
ALTER TABLE "AiSuggestion" DROP COLUMN "difficulty";

-- AlterTable
ALTER TABLE "WeakKeyStat" DROP COLUMN "avgLatency",
DROP COLUMN "key",
DROP COLUMN "totalPress",
ADD COLUMN     "attempts" INTEGER NOT NULL,
ADD COLUMN     "char" TEXT NOT NULL,
ADD COLUMN     "expectedChar" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WeakWordStat" ADD COLUMN     "totalTime" INTEGER NOT NULL,
ALTER COLUMN "avgTime" SET DATA TYPE INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "WeakKeyStat_userId_char_key" ON "WeakKeyStat"("userId", "char");
