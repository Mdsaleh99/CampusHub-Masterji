/*
  Warnings:

  - You are about to drop the column `examId` on the `Result` table. All the data in the column will be lost.
  - Added the required column `resultId` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_examId_fkey";

-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "resultId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "examId";

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE CASCADE ON UPDATE CASCADE;
