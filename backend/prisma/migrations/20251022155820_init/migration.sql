-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "nomeMae" TEXT,
    "nomeAcompanhante" TEXT,
    "profissao" TEXT,
    "dataNascimento" TIMESTAMP(3),
    "sexo" TEXT,
    "residente" TEXT,
    "raca" TEXT,
    "etnia" TEXT,
    "cpf" TEXT,
    "sus" TEXT,
    "rua" TEXT,
    "numero" TEXT,
    "bairro" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);
