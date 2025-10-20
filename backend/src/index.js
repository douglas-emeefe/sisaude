require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pacientesRoutes = require('./routes/pacientes');
const atendimentosRoutes = require('./routes/atendimentos');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/pacientes', pacientesRoutes);
app.use('/api/atendimentos', atendimentosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Backend rodando na porta ${PORT}`));