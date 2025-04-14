const express = require('express');
const EnderecoController = require('../controller');

const router = express.Router();

// http://localhost:3000/endereco
//criando
router.post("/endereco", EnderecoController.criarEndereco)

// pegando todos
router.get("/endereco", EnderecoController.listarEnderecos)

// pegando por aluno
router.get("/endereco/aluno/:matricula", EnderecoController.listarEnderecoAluno)

// pegando por cidade
router.get("/endereco/cidade/:cidade", EnderecoController.listarEnderecoCidade)

// pegndo por cep
router.get("/endereco/cep/:cep", EnderecoController.listarEnderecoCEP)

// editando
router.put("/endereco/:matricula", EnderecoController.editarEnderecoAluno)

module.exports = router