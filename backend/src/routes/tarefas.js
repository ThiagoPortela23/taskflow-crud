const express = require('express');
const router = express.Router();
const {
  listarTarefas,
  buscarTarefa,
  criarTarefa,
  atualizarTarefa,
  excluirTarefa,
} = require('../controllers/tarefaController');

router.get('/', listarTarefas);
router.get('/:id', buscarTarefa);
router.post('/', criarTarefa);
router.put('/:id', atualizarTarefa);
router.delete('/:id', excluirTarefa);

module.exports = router;
