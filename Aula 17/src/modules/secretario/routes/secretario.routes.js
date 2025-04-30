const express = require("express");
const router = express.Router();
const AlunoController = require('../controllers/aluno.controller');
// importar professor

/* ALUNO ROUTES */
router.post('secretario/cadastrar-aluno', AlunoController.criarAluno);  // Cadastrar aluno
router.get('/secretario/listar-aluno/:matricula', AlunoController.listarAlunoPorMatricula); // Cadastrar aluno por matrícula
router.get('/secretario/listar-alunos', AlunoController.listarAluno);  // Listar alunos
router.put('secretario/editar-aluno', AlunoController.editarAluno);  // Editar aluno
router.delete('secretario/deletar-aluno/:matricula', AlunoController.deletarAlunoPorMatricula);  // Deletar aluno por matrícula
// router.delete('secretario/deletar-alunos');  // Deletar todos os alunos


/* PROFESSOR ROUTES */
// http://localhost:3000/secretario/

module.exports = p