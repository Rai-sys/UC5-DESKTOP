const express = require('express');
const PrivativaController = require('../controllers/index');

const router = express.Router()

// criando
router.post("/compartilhada", PrivativaController.criar)

// pegando por ID
router.get("/compartilhada/:id", PrivativaController.listarPorID)

// pegando todos
router.get("/compartilhada", PrivativaController.listarTodas)

//editando
router.put("/compartilhada/:id", PrivativaController.editar)

// deletando por ID
router.delete("/compartilhada/:id", PrivativaController.deletarPorID)

// deletando todos
router.delete("/compartilhada", PrivativaController.deletarTodas)

module.exports = router;