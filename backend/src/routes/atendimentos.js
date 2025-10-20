const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');

router.get('/', async (req, res) => {
    const items = await prisma.atendimento.findMany({ include: { paciente: true }, orderBy: { dataAtendimento: 'desc' } });
    res.json(items);
});

router.post('/', async (req, res) => {
    const { pacienteId, profissional, queixa, observacoes } = req.body;
    const at = await prisma.atendimento.create({ data: { pacienteId: Number(pacienteId), profissional, queixa, observacoes } });
    res.status(201).json(at);
});

module.exports = router;