// Importando com (commonjs)
const express = require("express");
const dotenv = require("dotenv");
const sequelize = require('./src/config/configDb')
//const alunoRoutes = require("./src/modules/aluno/routes/index")
//const enderecoRoutes = require("./src/modules/endereco/routes/index")
dotenv.config();

const port = process.env.PORTA;
const app = express();

// Aplicação use express como json(javascript object notation)
app.use(express.json());

// passando as rotas de Aluno do route
//app.use(enderecoRoutes); // ex.: "/api/oQueEstiverVindoDoRoute"
//app.use(alunoRoutes);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('🌟 Conexão conectada com sucesso.');
  } catch (error) {
    console.error('🦖 Não foi possível conectar.', error);
  }
  console.log(`Servidor rodando em http://localhost:${port}`);
});