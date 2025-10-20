const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');

router.get('/', async (req, res) => {
    const pacientes = await prisma.paciente.findMany({ orderBy: { nome: 'asc' } });
    res.json(pacientes);
});

router.post('/', async (req, res) => {
    const { nome, nasc, cpf, telefone } = req.body;
    const paciente = await prisma.paciente.create({ data: { nome, nasc: nasc ? new Date(nasc) : null, cpf, telefone } });
    res.status(201).json(paciente);
});

module.exports = router;