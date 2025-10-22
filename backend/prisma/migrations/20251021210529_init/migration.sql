/*
  Warnings:

  - You are about to drop the `Atendimento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Paciente` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nome` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Atendimento" DROP CONSTRAINT "Atendimento_pacienteId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nome" TEXT NOT NULL;

-- DropTable
DROP TABLE "Atendimento";

-- DropTable
DROP TABLE "Paciente";
