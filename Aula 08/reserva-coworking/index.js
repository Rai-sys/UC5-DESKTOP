// Importando com (commonjs)
const express = require("express");
const dotenv = require("dotenv");
const compartilhadaRoutes = require('./src/modules/compartilhada/routes/index')
dotenv.config();

const port = process.env.PORTA;
const app = express();

// Aplicação use express como json(javascript object notation)
app.use(express.json());

// passando as rotas de Aluno do route
app.use(compartilhadaRoutes); 

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});