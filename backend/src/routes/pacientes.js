const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- Rota para cadastrar paciente ---
router.post("/", async (req, res) => {
  try {
    const {
      nome,
      nomeMae,
      nomeAcompanhante,
      profissao,
      dataNascimento,
      sexo,
      residente,
      raca,
      etnia,
      cpf,
      sus,
      rua,
      numero,
      bairro,
    } = req.body;

    if (!nome || !cpf) {
      return res.status(400).json({ erro: "Nome e CPF são obrigatórios." });
    }

    const novoPaciente = await prisma.Paciente.create({
      data: {
        nome,
        nomeMae,
        nomeAcompanhante,
        profissao,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
        sexo,
        residente,
        raca,
        etnia,
        cpf,
        sus,
        rua,
        numero,
        bairro,
      },
    });

    res.status(201).json(novoPaciente);
  } catch (erro) {
    console.error("Erro ao cadastrar paciente:", erro);
    res.status(500).json({ erro: "Erro interno ao cadastrar paciente." });
  }
});

// --- Rota opcional para listar pacientes ---
router.get("/", async (req, res) => {
  try {
    const pacientes = await prisma.Paciente.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(pacientes);
  } catch (erro) {
    console.error("Erro ao listar pacientes:", erro);
    res.status(500).json({ erro: "Erro ao buscar pacientes." });
  }
});

module.exports = router;
