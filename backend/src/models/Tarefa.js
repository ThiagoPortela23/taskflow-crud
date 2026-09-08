const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Tarefa = sequelize.define('Tarefa', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'O título não pode ser vazio.' },
      len: { args: [1, 200], msg: 'O título deve ter entre 1 e 200 caracteres.' },
    },
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '',
  },
  status: {
    type: DataTypes.ENUM('pendente', 'em_andamento', 'concluida'),
    defaultValue: 'pendente',
    allowNull: false,
  },
  prioridade: {
    type: DataTypes.ENUM('baixa', 'media', 'alta'),
    defaultValue: 'media',
    allowNull: false,
  },
}, {
  tableName: 'tarefas',
  timestamps: true,
});

module.exports = Tarefa;
