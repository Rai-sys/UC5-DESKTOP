const express = require('express');
const CompartilhadaController = require('../controllers/index');

const router = express.Router()

// criando
router.post("/compartilhada", CompartilhadaController.criar)

// pegando por ID
router.get("/compartilhada/:id", CompartilhadaController.listarPorID)

// pegando todos
router.get("/compartilhada", CompartilhadaController.listarTodas)

//editando
router.put("/compartilhada/:id", CompartilhadaController.editar)

// deletando por ID
router.delete("/compartilhada/:id", CompartilhadaController.deletarPorID)

// deletando todos
router.delete("/compartilada", CompartilhadaController.deletarTodas)

module.exports = router;