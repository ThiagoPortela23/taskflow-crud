const Tarefa = require('../models/Tarefa');
const { Op } = require('sequelize');

// GET /api/tarefas
const listarTarefas = async (req, res) => {
  try {
    const { status, prioridade, busca } = req.query;
    const where = {};

    if (status) where.status = status;
    if (prioridade) where.prioridade = prioridade;
    if (busca) {
      where.titulo = { [Op.iLike]: `%${busca}%` };
    }

    const tarefas = await Tarefa.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    return res.json({ success: true, data: tarefas });
  } catch (err) {
    console.error('Erro ao listar tarefas:', err);
    return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
  }
};

// GET /api/tarefas/:id
const buscarTarefa = async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (!tarefa) {
      return res.status(404).json({ success: false, message: 'Tarefa não encontrada.' });
    }
    return res.json({ success: true, data: tarefa });
  } catch (err) {
    console.error('Erro ao buscar tarefa:', err);
    return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
  }
};

// POST /api/tarefas
const criarTarefa = async (req, res) => {
  try {
    const { titulo, descricao, status, prioridade } = req.body;

    if (!titulo || titulo.trim() === '') {
      return res.status(400).json({ success: false, message: 'O título é obrigatório.' });
    }

    const tarefa = await Tarefa.create({
      titulo: titulo.trim(),
      descricao: descricao?.trim() || '',
      status: status || 'pendente',
      prioridade: prioridade || 'media',
    });

    return res.status(201).json({ success: true, data: tarefa });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: err.errors.map((e) => e.message).join(', '),
      });
    }
    console.error('Erro ao criar tarefa:', err);
    return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
  }
};

// PUT /api/tarefas/:id
const atualizarTarefa = async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (!tarefa) {
      return res.status(404).json({ success: false, message: 'Tarefa não encontrada.' });
    }

    const { titulo, descricao, status, prioridade } = req.body;

    await tarefa.update({
      titulo: titulo !== undefined ? titulo.trim() : tarefa.titulo,
      descricao: descricao !== undefined ? descricao.trim() : tarefa.descricao,
      status: status || tarefa.status,
      prioridade: prioridade || tarefa.prioridade,
    });

    return res.json({ success: true, data: tarefa });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: err.errors.map((e) => e.message).join(', '),
      });
    }
    console.error('Erro ao atualizar tarefa:', err);
    return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
  }
};

// DELETE /api/tarefas/:id
const excluirTarefa = async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (!tarefa) {
      return res.status(404).json({ success: false, message: 'Tarefa não encontrada.' });
    }

    await tarefa.destroy();
    return res.json({ success: true, message: 'Tarefa excluída com sucesso.' });
  } catch (err) {
    console.error('Erro ao excluir tarefa:', err);
    return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
  }
};

module.exports = { listarTarefas, buscarTarefa, criarTarefa, atualizarTarefa, excluirTarefa };
