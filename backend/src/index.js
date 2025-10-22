require('dotenv').config();
const express = require('express');
const cors = require('cors');

const loginRoutes = require('./routes/login');
const prontuarioRoutes = require('./routes/pacientes');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/login', loginRoutes);
app.use('/api/pacientes', prontuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Backend rodando na porta ${PORT}`));