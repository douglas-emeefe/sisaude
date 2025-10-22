const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');

// POST /api/login
router.post('/', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await prisma.User.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    if (usuario.password !== senha) {
      return res.status(401).json({ mensagem: "Senha incorreta" });
    }

    res.json({
      mensagem: "Login realizado com sucesso!",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
      token: "fake-token-exemplo", // será substituído por JWT
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
});

module.exports = router;