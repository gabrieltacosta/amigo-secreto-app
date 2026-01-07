/*
  Warnings:

  - A unique constraint covering the columns `[drawnParticipantId]` on the table `participants` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "participants" ADD COLUMN     "drawnParticipantId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "participants_drawnParticipantId_key" ON "participants"("drawnParticipantId");

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_drawnParticipantId_fkey" FOREIGN KEY ("drawnParticipantId") REFERENCES "participants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
