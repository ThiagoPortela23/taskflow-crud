require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');
const tarefasRoutes = require('./src/routes/tarefas');

// Importar models para sincronização
require('./src/models/Tarefa');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/tarefas', tarefasRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Rota não encontrada.' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
});

// Inicializar servidor
async function inicializar() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o PostgreSQL estabelecida com sucesso!');

    await sequelize.sync({ alter: true });
    console.log('✅ Tabelas sincronizadas com sucesso!');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
      console.log(`📋 API de Tarefas: http://localhost:${PORT}/api/tarefas`);
    });
  } catch (err) {
    console.error('❌ Erro ao inicializar o servidor:', err.message);
    process.exit(1);
  }
}

inicializar();
